info = {
  "desc":{
     "author":"Olof Lagerkvist",
     "home_page":"http://www.ltr-data.se/opencode.html/#ImDisk"
  },
  "versions":[
    "latest",
    "2.0.10",
    "2.0.9"
  ],
  'arch': ['x64', 'x86'],
  "fetch":{
    "latest":{
      "archive":"latest/ImDisk_%arch%.exe",
      "from":"http://www.ltr-data.se/files/imdiskinst.exe",
      "to":"latest/imdiskinst.exe",
      "fallback":"%name%/imdiskinst.exe"
    },
    "%version%":{
      "archive":"%version%/ImDisk_%arch%.exe",
      "from":"http://www.ltr-data.se/files/imdiskinst_%version%.exe",
      "to":"%version%/imdiskinst.exe",
      "fallback":"%name%/imdiskinst_%version%.exe"
    }
  }
}

