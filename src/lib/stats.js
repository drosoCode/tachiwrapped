import { Duration } from "luxon";
import Long from "long"

const TIME_FILTER = 2000; // exclude reading time of less than 2 sec (unreliable)
const CUSTOM_TIME_FACTOR_VAL = 4*60*1000;
const CUSTOM_TIME_FACTOR = false;

function median(a) {
    a = a.slice(0).sort(function(x, y) {
      return x - y;
    });
    var b = (a.length + 1) / 2;
    return (a.length % 2) ? a[b - 1] : (a[b - 1.5] + a[b - 0.5]) / 2;
}
function avg(x) {
    var s = 0;
    for(const a of x) {
        s += a
    }
    return s/x.length
}

function getNumber(num) {
    if(num == undefined)
        return 0;
    return new Long(num.low, num.high, num.unsigned).toNumber();
}

export function getYears(bak) {
    const years = new Set();
    bak.backupManga.forEach(m => {
        m.chapters.forEach(c => {
            years.add(new Date(getNumber(c.dateFetch)).getFullYear());
        });
        m.history?.forEach(h => {
            years.add(new Date(getNumber(h.lastRead)).getFullYear());
        })
    });
    return [...years].sort((a,b) => (a-b));
}

export function getSources(bak) {
    const sources = {};
    bak.backupSources.forEach(m => {
        sources[m["sourceId"]] = m["name"];
    });
    return sources;
}

export function getMangaData(bak, year) {
    var m = {};
    var timePerChapter = [];

    bak.backupManga.forEach(e => {
        m[e.title] = {// common data
            "totalChapters": e.chapters.length,
            "genres": e.genre,
            "source": getNumber(e.source),
            "image": e.thumbnailUrl,
            "author": e.author,
            "byMonth": [], // computed data by month
            "historyToDate": {}, 
            "minChapter": -1,
            "maxChapter": -1,
            "minDate": null,
            "maxDate": null,
            "upToDate": false
        }
        for(let i = 0; i<12; i++) {
            m[e.title]["byMonth"][i] = {
                "time": 0, // reading time
                "chapters": 0, // read chapters
                "nbMissingTime": 0, // chapters that don't have reading time
            }
        }
        // history stores an entry for each chapter (except that chapters are missing)
        e.history?.forEach(h => {
            const d = new Date(getNumber(h.lastRead));
            if(d.getFullYear() == year) {
                const duration = getNumber(h.readDuration);
                if(duration > TIME_FILTER) {
                    // if duration seems reliable, count it
                    m[e.title]["byMonth"][d.getMonth()]["time"] += duration // in ms
                    timePerChapter.push(duration)
                } else {
                    // else, count this chapter as missing time
                    m[e.title]["byMonth"][d.getMonth()]["nbMissingTime"]++
                }
                m[e.title]["byMonth"][d.getMonth()]["chapters"]++;
                m[e.title]["historyToDate"][h.url] = d // url for chapter that have an history entry
            }
        });

        // fix read chapter number        
        var lastKnownHistory = null;
        var lastChapter = 0;
        e.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber).forEach(c => {
            const date = new Date(getNumber(c.dateFetch));
            const dlThisYear = c.read && date.getFullYear() == year;
            if(dlThisYear) {
                // if chapter was downloaded and read this year, count it
                if(c.url in m[e.title]["historyToDate"]) {
                    lastKnownHistory = m[e.title]["historyToDate"][c.url].getMonth();
                } else {
                    const month = lastKnownHistory == null ? 0 : lastKnownHistory;
                    m[e.title]["byMonth"][month]["chapters"]++;
                    m[e.title]["byMonth"][month]["nbMissingTime"]++;
                }

                if(m[e.title]["minDate"] == null)
                    m[e.title]["minDate"] = date;
                m[e.title]["maxDate"] = date;
            } else if(c.url in m[e.title]["historyToDate"]) {
                if(m[e.title]["minDate"] == null)
                    m[e.title]["minDate"] = m[e.title]["historyToDate"][c.url];
                m[e.title]["maxDate"] = m[e.title]["historyToDate"][c.url];
            }

            if(dlThisYear || c.url in m[e.title]["historyToDate"]) {
                if(m[e.title]["minChapter"] == -1)
                    m[e.title]["minChapter"] = c.chapterNumber;
                m[e.title]["maxChapter"] = c.chapterNumber;
            }
            lastChapter = c.chapterNumber;
        })
        m[e.title]["upToDate"] = lastChapter == m[e.title]["maxChapter"];
    });

    // once we have enough data to get the average reading time, fix missing time 
    const f = !CUSTOM_TIME_FACTOR && timePerChapter.length > 0 ? avg(timePerChapter) : CUSTOM_TIME_FACTOR_VAL;
    for(const k of Object.keys(m)) {
        for(let i = 0; i<12; i++) {
            m[k]["byMonth"][i]["time"] += m[k]["byMonth"][i]["nbMissingTime"]*f;
        }
    }

    return m;
}

export function getStats(data) {
    const stats = {
        "totalChapters": 0,
        "totalTime": 0,
        "totalMangas": 0,
        "upToDateMangas": 0,
        "byMonth": [],
        "authorsByManga": {},
        "authorsByChapter": {},
        "sources": {},
        "genres": {},
    };
    for(let i = 0; i<12; i++) {
        stats["byMonth"][i] = {
            "chapters": 0,
            "time": 0,
        }
    }

    for(const [k,v] of Object.entries(data)) {
        if(v["minChapter"] != -1) {
            let sumChap = 0;
            let sumTime = 0;
            for(let i = 0; i<12; i++) {
                sumChap += v["byMonth"][i]["chapters"];
                sumTime += v["byMonth"][i]["time"];
                stats["byMonth"][i]["chapters"] += v["byMonth"][i]["chapters"];
                stats["byMonth"][i]["time"] += v["byMonth"][i]["time"];
            }
            v.genres.forEach(g => {
                g = g.replaceAll('"', "").trim()
                if(g in stats["genres"])
                    stats["genres"][g]++;
                else
                    stats["genres"][g] = 1;
            });
            if(v["author"] in stats["authorsByManga"])
                stats["authorsByManga"][v["author"]].push(k);
            else
                stats["authorsByManga"][v["author"]] = [k];

            if(v["author"] in stats["authorsByChapter"])
                stats["authorsByChapter"][v["author"]] += sumChap;
            else
                stats["authorsByChapter"][v["author"]] = sumChap;

            if(v["source"] in stats["sources"])
                stats["sources"][v["source"]]++;
            else
                stats["sources"][v["source"]] = 1;
            // console.log(k+ ": "+sumChap+" chapters, "+ Duration.fromMillis(sumTime).toFormat("h:mm").replace(":","h ")+"min, min: "+v["minChapter"]+", max: "+v["maxChapter"]+", upToDate: "+v["upToDate"])
            stats["totalTime"] += sumTime;
            stats["totalChapters"] += sumChap;
            stats["totalMangas"]++;
            if(v.upToDate)
                stats["upToDateMangas"]++;
        }
    }

    //stats["totalTimeStr"] = Duration.fromMillis(stats["totalTime"]).toFormat("d,h;mm")+"min".replace(",", "d ").replace(";", "h ")

    /*
        [ok] auteur prefs
        [ok] 5 genres les + présents
        [ok] 5 sources les + présentes
        5 mangas les + lus
        [ok] graphe du nb chapitre par mois
        mois le plus actif
        [ok] pourcentage à jour/en cours
        mangas lus de 0 à 100
        manga lu le plus vite (ex: un seul mois)
    */
   return stats;
}
