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

export function getMangaData(bak, year) {
    var m = {};
    var timePerChapter = [];

    bak.backupManga.forEach(e => {
        m[e.title] = {// common data
            "totalChapters": e.chapters.length,
            "genre": e.genre,
            "image": e.thumbnailUrl,
            "author": e.author,
            "byMonth": [], // computed data by month
            "historyToDate": {}, 
            "minChapter": 0,
            "maxChapter": 0,
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
        var lastReadChapter = 0;
        var firstReadChapter = -1;
        e.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber).forEach(c => {
            const dlThisYear = c.read && new Date(getNumber(c.dateFetch)).getFullYear() == year;
            if(dlThisYear) {
                // if chapter was downloaded and read this year, count it
                if(c.url in m[e.title]["historyToDate"]) {
                    lastKnownHistory = m[e.title]["historyToDate"][c.url].getMonth();
                } else {
                    const month = lastKnownHistory == null ? 0 : lastKnownHistory;
                    m[e.title]["byMonth"][month]["chapters"]++;
                    m[e.title]["byMonth"][month]["nbMissingTime"]++;
                }
            }
            if(dlThisYear || c.url in m[e.title]["historyToDate"]) {
                if(firstReadChapter == -1)
                    firstReadChapter = c.chapterNumber;
                lastReadChapter = c.chapterNumber;
            }
            lastChapter = c.chapterNumber;
        })
        m[e.title]["upToDate"] = lastChapter == lastReadChapter;
        m[e.title]["minChapter"] = firstReadChapter;
        m[e.title]["maxChapter"] = lastChapter;
    });

    // once we have enough data to get the average reading time, fix missing time 
    const f = !CUSTOM_TIME_FACTOR && timePerChapter.length > 0 ? avg(timePerChapter) : CUSTOM_TIME_FACTOR_VAL;
    console.log(f);
    for(const k of Object.keys(m)) {
        for(let i = 0; i<12; i++) {
            m[k]["byMonth"][i]["time"] += m[k]["byMonth"][i]["nbMissingTime"]*f;
        }
    }

    return m;
}

export function printStats(data) {
    var time = 0;
    var chapters = 0;
    var nb = 0;
    for(const [k,v] of Object.entries(data)) {
        if(v["minChapter"] != -1) {
            let sumChap = 0;
            let sumTime = 0;
            for(let i = 0; i<12; i++) {
                sumChap += v["byMonth"][i]["chapters"];
                sumTime += v["byMonth"][i]["time"];
            }
            console.log(k+ ": "+sumChap+" chapters, "+ Duration.fromMillis(sumTime).toFormat("h:mm").replace(":","h ")+"min, min: "+v["minChapter"]+", max: "+v["maxChapter"]+", upToDate: "+v["upToDate"])
            time += sumTime
            chapters += sumChap
            nb++
        }
    }
    console.log("================================================")
    console.log("series: "+nb)
    console.log("chapters: "+chapters)
    console.log("time: " + (Duration.fromMillis(time).toFormat("d,h;mm")+"min").replace(",", "d ").replace(";", "h "))

    /*
        5 genres les + présents
        5 sources les + présentes
        graphe du nb chapitre par mois
        mois le plus actif
        pourcentage à jour/en cours
        mangas lus de 0 à 100
        manga lu le plus vite (ex: un seul mois)
    */
}