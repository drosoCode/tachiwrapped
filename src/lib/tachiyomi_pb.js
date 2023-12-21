export function encodeBackup(message) {
  let bb = popByteBuffer();
  _encodeBackup(message, bb);
  return toUint8Array(bb);
}

function _encodeBackup(message, bb) {
  // repeated BackupManga backupManga = 1;
  let array$backupManga = message.backupManga;
  if (array$backupManga !== undefined) {
    for (let value of array$backupManga) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeBackupManga(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated BackupCategory backupCategories = 2;
  let array$backupCategories = message.backupCategories;
  if (array$backupCategories !== undefined) {
    for (let value of array$backupCategories) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeBackupCategory(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated BackupSource backupSources = 101;
  let array$backupSources = message.backupSources;
  if (array$backupSources !== undefined) {
    for (let value of array$backupSources) {
      writeVarint32(bb, 810);
      let nested = popByteBuffer();
      _encodeBackupSource(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeBackup(binary) {
  return _decodeBackup(wrapByteBuffer(binary));
}

function _decodeBackup(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated BackupManga backupManga = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.backupManga || (message.backupManga = []);
        values.push(_decodeBackupManga(bb));
        bb.limit = limit;
        break;
      }

      // repeated BackupCategory backupCategories = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.backupCategories || (message.backupCategories = []);
        values.push(_decodeBackupCategory(bb));
        bb.limit = limit;
        break;
      }

      // repeated BackupSource backupSources = 101;
      case 101: {
        let limit = pushTemporaryLength(bb);
        let values = message.backupSources || (message.backupSources = []);
        values.push(_decodeBackupSource(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeBackupCategory(message) {
  let bb = popByteBuffer();
  _encodeBackupCategory(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupCategory(message, bb) {
  // required string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional int64 order = 2;
  let $order = message.order;
  if ($order !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $order);
  }

  // optional int64 flags = 100;
  let $flags = message.flags;
  if ($flags !== undefined) {
    writeVarint32(bb, 800);
    writeVarint64(bb, $flags);
  }
}

export function decodeBackupCategory(binary) {
  return _decodeBackupCategory(wrapByteBuffer(binary));
}

function _decodeBackupCategory(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 order = 2;
      case 2: {
        message.order = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 flags = 100;
      case 100: {
        message.flags = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.name === undefined)
    throw new Error("Missing required field: name");

  return message;
}

export function encodeBackupChapter(message) {
  let bb = popByteBuffer();
  _encodeBackupChapter(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupChapter(message, bb) {
  // required string url = 1;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $url);
  }

  // required string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string scanlator = 3;
  let $scanlator = message.scanlator;
  if ($scanlator !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $scanlator);
  }

  // optional bool read = 4;
  let $read = message.read;
  if ($read !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $read ? 1 : 0);
  }

  // optional bool bookmark = 5;
  let $bookmark = message.bookmark;
  if ($bookmark !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $bookmark ? 1 : 0);
  }

  // optional int64 lastPageRead = 6;
  let $lastPageRead = message.lastPageRead;
  if ($lastPageRead !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $lastPageRead);
  }

  // optional int64 dateFetch = 7;
  let $dateFetch = message.dateFetch;
  if ($dateFetch !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $dateFetch);
  }

  // optional int64 dateUpload = 8;
  let $dateUpload = message.dateUpload;
  if ($dateUpload !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dateUpload);
  }

  // optional float chapterNumber = 9;
  let $chapterNumber = message.chapterNumber;
  if ($chapterNumber !== undefined) {
    writeVarint32(bb, 77);
    writeFloat(bb, $chapterNumber);
  }

  // optional int64 sourceOrder = 10;
  let $sourceOrder = message.sourceOrder;
  if ($sourceOrder !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $sourceOrder);
  }
}

export function decodeBackupChapter(binary) {
  return _decodeBackupChapter(wrapByteBuffer(binary));
}

function _decodeBackupChapter(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string url = 1;
      case 1: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // required string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string scanlator = 3;
      case 3: {
        message.scanlator = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool read = 4;
      case 4: {
        message.read = !!readByte(bb);
        break;
      }

      // optional bool bookmark = 5;
      case 5: {
        message.bookmark = !!readByte(bb);
        break;
      }

      // optional int64 lastPageRead = 6;
      case 6: {
        message.lastPageRead = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 dateFetch = 7;
      case 7: {
        message.dateFetch = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 dateUpload = 8;
      case 8: {
        message.dateUpload = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional float chapterNumber = 9;
      case 9: {
        message.chapterNumber = readFloat(bb);
        break;
      }

      // optional int64 sourceOrder = 10;
      case 10: {
        message.sourceOrder = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.url === undefined)
    throw new Error("Missing required field: url");

  if (message.name === undefined)
    throw new Error("Missing required field: name");

  return message;
}

export function encodeBackupHistory(message) {
  let bb = popByteBuffer();
  _encodeBackupHistory(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupHistory(message, bb) {
  // required string url = 1;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $url);
  }

  // required int64 lastRead = 2;
  let $lastRead = message.lastRead;
  if ($lastRead !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $lastRead);
  }

  // optional int64 readDuration = 3;
  let $readDuration = message.readDuration;
  if ($readDuration !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $readDuration);
  }
}

export function decodeBackupHistory(binary) {
  return _decodeBackupHistory(wrapByteBuffer(binary));
}

function _decodeBackupHistory(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string url = 1;
      case 1: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // required int64 lastRead = 2;
      case 2: {
        message.lastRead = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 readDuration = 3;
      case 3: {
        message.readDuration = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.url === undefined)
    throw new Error("Missing required field: url");

  if (message.lastRead === undefined)
    throw new Error("Missing required field: lastRead");

  return message;
}

export function encodeBackupManga(message) {
  let bb = popByteBuffer();
  _encodeBackupManga(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupManga(message, bb) {
  // required int64 source = 1;
  let $source = message.source;
  if ($source !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $source);
  }

  // required string url = 2;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $url);
  }

  // optional string title = 3;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $title);
  }

  // optional string artist = 4;
  let $artist = message.artist;
  if ($artist !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $artist);
  }

  // optional string author = 5;
  let $author = message.author;
  if ($author !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $author);
  }

  // optional string description = 6;
  let $description = message.description;
  if ($description !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $description);
  }

  // repeated string genre = 7;
  let array$genre = message.genre;
  if (array$genre !== undefined) {
    for (let value of array$genre) {
      writeVarint32(bb, 58);
      writeString(bb, value);
    }
  }

  // optional int32 status = 8;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($status));
  }

  // optional string thumbnailUrl = 9;
  let $thumbnailUrl = message.thumbnailUrl;
  if ($thumbnailUrl !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $thumbnailUrl);
  }

  // optional int64 dateAdded = 13;
  let $dateAdded = message.dateAdded;
  if ($dateAdded !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $dateAdded);
  }

  // optional int32 viewer = 14;
  let $viewer = message.viewer;
  if ($viewer !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($viewer));
  }

  // repeated BackupChapter chapters = 16;
  let array$chapters = message.chapters;
  if (array$chapters !== undefined) {
    for (let value of array$chapters) {
      writeVarint32(bb, 130);
      let nested = popByteBuffer();
      _encodeBackupChapter(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 categories = 17;
  let array$categories = message.categories;
  if (array$categories !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$categories) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 138);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated BackupTracking tracking = 18;
  let array$tracking = message.tracking;
  if (array$tracking !== undefined) {
    for (let value of array$tracking) {
      writeVarint32(bb, 146);
      let nested = popByteBuffer();
      _encodeBackupTracking(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bool favorite = 100;
  let $favorite = message.favorite;
  if ($favorite !== undefined) {
    writeVarint32(bb, 800);
    writeByte(bb, $favorite ? 1 : 0);
  }

  // optional int32 chapterFlags = 101;
  let $chapterFlags = message.chapterFlags;
  if ($chapterFlags !== undefined) {
    writeVarint32(bb, 808);
    writeVarint64(bb, intToLong($chapterFlags));
  }

  // optional int32 viewer_flags = 103;
  let $viewer_flags = message.viewer_flags;
  if ($viewer_flags !== undefined) {
    writeVarint32(bb, 824);
    writeVarint64(bb, intToLong($viewer_flags));
  }

  // repeated BackupHistory history = 104;
  let array$history = message.history;
  if (array$history !== undefined) {
    for (let value of array$history) {
      writeVarint32(bb, 834);
      let nested = popByteBuffer();
      _encodeBackupHistory(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 updateStrategy = 105;
  let $updateStrategy = message.updateStrategy;
  if ($updateStrategy !== undefined) {
    writeVarint32(bb, 840);
    writeVarint64(bb, intToLong($updateStrategy));
  }
}

export function decodeBackupManga(binary) {
  return _decodeBackupManga(wrapByteBuffer(binary));
}

function _decodeBackupManga(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int64 source = 1;
      case 1: {
        message.source = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // required string url = 2;
      case 2: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string title = 3;
      case 3: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string artist = 4;
      case 4: {
        message.artist = readString(bb, readVarint32(bb));
        break;
      }

      // optional string author = 5;
      case 5: {
        message.author = readString(bb, readVarint32(bb));
        break;
      }

      // optional string description = 6;
      case 6: {
        message.description = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string genre = 7;
      case 7: {
        let values = message.genre || (message.genre = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional int32 status = 8;
      case 8: {
        message.status = readVarint32(bb);
        break;
      }

      // optional string thumbnailUrl = 9;
      case 9: {
        message.thumbnailUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 dateAdded = 13;
      case 13: {
        message.dateAdded = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 viewer = 14;
      case 14: {
        message.viewer = readVarint32(bb);
        break;
      }

      // repeated BackupChapter chapters = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        let values = message.chapters || (message.chapters = []);
        values.push(_decodeBackupChapter(bb));
        bb.limit = limit;
        break;
      }

      // repeated int64 categories = 17;
      case 17: {
        let values = message.categories || (message.categories = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // repeated BackupTracking tracking = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        let values = message.tracking || (message.tracking = []);
        values.push(_decodeBackupTracking(bb));
        bb.limit = limit;
        break;
      }

      // optional bool favorite = 100;
      case 100: {
        message.favorite = !!readByte(bb);
        break;
      }

      // optional int32 chapterFlags = 101;
      case 101: {
        message.chapterFlags = readVarint32(bb);
        break;
      }

      // optional int32 viewer_flags = 103;
      case 103: {
        message.viewer_flags = readVarint32(bb);
        break;
      }

      // repeated BackupHistory history = 104;
      case 104: {
        let limit = pushTemporaryLength(bb);
        let values = message.history || (message.history = []);
        values.push(_decodeBackupHistory(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 updateStrategy = 105;
      case 105: {
        message.updateStrategy = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.source === undefined)
    throw new Error("Missing required field: source");

  if (message.url === undefined)
    throw new Error("Missing required field: url");

  return message;
}

export function encodeBackupSource(message) {
  let bb = popByteBuffer();
  _encodeBackupSource(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupSource(message, bb) {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // required int64 sourceId = 2;
  let $sourceId = message.sourceId;
  if ($sourceId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $sourceId);
  }
}

export function decodeBackupSource(binary) {
  return _decodeBackupSource(wrapByteBuffer(binary));
}

function _decodeBackupSource(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // required int64 sourceId = 2;
      case 2: {
        message.sourceId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.sourceId === undefined)
    throw new Error("Missing required field: sourceId");

  return message;
}

export function encodeBackupTracking(message) {
  let bb = popByteBuffer();
  _encodeBackupTracking(message, bb);
  return toUint8Array(bb);
}

function _encodeBackupTracking(message, bb) {
  // required int32 syncId = 1;
  let $syncId = message.syncId;
  if ($syncId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($syncId));
  }

  // required int64 libraryId = 2;
  let $libraryId = message.libraryId;
  if ($libraryId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $libraryId);
  }

  // optional int32 mediaIdInt = 3;
  let $mediaIdInt = message.mediaIdInt;
  if ($mediaIdInt !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($mediaIdInt));
  }

  // optional string trackingUrl = 4;
  let $trackingUrl = message.trackingUrl;
  if ($trackingUrl !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $trackingUrl);
  }

  // optional string title = 5;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $title);
  }

  // optional float lastChapterRead = 6;
  let $lastChapterRead = message.lastChapterRead;
  if ($lastChapterRead !== undefined) {
    writeVarint32(bb, 53);
    writeFloat(bb, $lastChapterRead);
  }

  // optional int32 totalChapters = 7;
  let $totalChapters = message.totalChapters;
  if ($totalChapters !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($totalChapters));
  }

  // optional float score = 8;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $score);
  }

  // optional int32 status = 9;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($status));
  }

  // optional int64 startedReadingDate = 10;
  let $startedReadingDate = message.startedReadingDate;
  if ($startedReadingDate !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $startedReadingDate);
  }

  // optional int64 finishedReadingDate = 11;
  let $finishedReadingDate = message.finishedReadingDate;
  if ($finishedReadingDate !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $finishedReadingDate);
  }

  // optional int64 mediaId = 100;
  let $mediaId = message.mediaId;
  if ($mediaId !== undefined) {
    writeVarint32(bb, 800);
    writeVarint64(bb, $mediaId);
  }
}

export function decodeBackupTracking(binary) {
  return _decodeBackupTracking(wrapByteBuffer(binary));
}

function _decodeBackupTracking(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 syncId = 1;
      case 1: {
        message.syncId = readVarint32(bb);
        break;
      }

      // required int64 libraryId = 2;
      case 2: {
        message.libraryId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 mediaIdInt = 3;
      case 3: {
        message.mediaIdInt = readVarint32(bb);
        break;
      }

      // optional string trackingUrl = 4;
      case 4: {
        message.trackingUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string title = 5;
      case 5: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional float lastChapterRead = 6;
      case 6: {
        message.lastChapterRead = readFloat(bb);
        break;
      }

      // optional int32 totalChapters = 7;
      case 7: {
        message.totalChapters = readVarint32(bb);
        break;
      }

      // optional float score = 8;
      case 8: {
        message.score = readFloat(bb);
        break;
      }

      // optional int32 status = 9;
      case 9: {
        message.status = readVarint32(bb);
        break;
      }

      // optional int64 startedReadingDate = 10;
      case 10: {
        message.startedReadingDate = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 finishedReadingDate = 11;
      case 11: {
        message.finishedReadingDate = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 mediaId = 100;
      case 100: {
        message.mediaId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.syncId === undefined)
    throw new Error("Missing required field: syncId");

  if (message.libraryId === undefined)
    throw new Error("Missing required field: libraryId");

  return message;
}

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
