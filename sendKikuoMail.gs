function fetchSongsList() {
  try {
    let response = UrlFetchApp.fetch("https://vocadb.net/api/songs?childTags=false&unifyTypesAndTags=false&artistId%5B%5D=470&includeMembers=false&onlyWithPvs=true&pvServices=Youtube&start=0&maxResults=1000&getTotalCount=false&preferAccurateMatches=false&lang=Romaji");
    let json = JSON.parse(response.getContentText());
    var songs = json.items;

    if (!songs || songs.length === 0) {
    Logger.log('No songs found in the API response.');
    return;
  }
  
  let song = generateSong(songs);

  let youtubeLink = song.url;
  let thumbnail = song.thumbUrl;

  // SEND MAIL
  let email = "YOUR EMAIL HERE";
  let subject = "Your Daily Dose of Kikuo <3";
  let body = "<html><body>"
  + "<h2>Your randomly generated PV:</h2>"
  + song.name + "<br><br>"
  + youtubeLink 
  + `<p><img src="${thumbnail}" alt="Thumbnail" style="width:120px;"></p>` 
  + "</body></html>";

  MailApp.sendEmail({to: email, subject: subject, htmlBody: body});
  Logger.log("Link: " + youtubeLink);

  }
  catch(error) {
    Logger.log("Error: " + error);
    fetchSongsList();
  }

  Logger.log("Mail sent");
}

function generateSong(songs) {
  // Generate a random index
  var randomIndex = Math.floor(Math.random() * songs.length);
  
  var randomSong = songs[randomIndex];
  var songId = randomSong.id;
  
  Logger.log('Random Song ID: ' + songId);

  var songName = randomSong.defaultName;

  Logger.log('Song name: ' + songName);
  
  songName = encodeURIComponent(songName);

  Logger.log(songName + "\n\n" + `https://vocadb.net/api/pvs/for-songs?name=${songName}&service=Youtube&maxResults=10&lang=Japanese`)
  
  var song;

  try {
  response = UrlFetchApp.fetch(`https://vocadb.net/api/pvs/for-songs?name=${songName}&service=Youtube&maxResults=10&lang=Japanese`);
  json = JSON.parse(response.getContentText());
  song = json.items[0];
  }
  catch(error) {
    Logger.log("ERROR ENCOUNTERED: " + error);
    return generateSong(songs);
  }
  return song;
}
