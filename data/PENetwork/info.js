function fetch_init() {
  if (arch == 'x64') add_var('_arch', '_x64')
  if (arch == '' && ver != 'latest') {
      error('Error:missing arch option')
      quit(1)
  }
}

info = {
  "desc":{
     "author":"Holger",
     "home_page":"https://www.penetworkmanager.de/"
  },
  "versions":[
    "latest",
    "v0.59.B10"
  ],
  'arch': ['x64', 'x86'],
  "fetch":{
    "latest":{
      "archive":"PENetwork%_arch%.7z",
      "from":"https://www.penetworkmanager.de/scripts/PENetwork%_arch%.7z",
      "fallback":"PENetwork/PENetwork%_arch%.7z"
    },
    "%version%":{
      "archive":"%version%/PENetwork_%arch%.7z",
      "from":"https://www.penetworkmanager.de/scripts/PENetwork_%arch%_%version%.7z",
      "fallback":"PENetwork/PENetwork_%arch%_%version%.7z",
      "verify":"MD5:xxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}

