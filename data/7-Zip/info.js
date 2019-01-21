function fetch_init() {
  if (arch == 'x64') add_var('_arch', '-x64')
}

info = {
  "desc":{
     "author":"Igor Pavlov",
     "home_page":"https://www.7-zip.org/"
  },
  "versions":[
    "1806",   // first one be the 'latest'
  ],
  'arch': ['x64', 'x86'],
  "fetch":{
    "%version%":{
      "archive":"7z%version%%_arch%.exe",
      "from":"https://www.7-zip.org/a/7z%version%%_arch%.exe",
      "#fallback":"7-Zip/7z%version%%_arch%.exe"
    }
  }
}

