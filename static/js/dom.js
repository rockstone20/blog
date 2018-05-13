function $(Arg) {
  if(typeof Arg === 'string') {
    switch (Arg.charAt(0)) {
      case '#':
        return document.getElementById(Arg.substr(1));
        break;
      case '.':
        return document.getElementsByClassName(Arg.substr(1))[0];
    }
  }
}