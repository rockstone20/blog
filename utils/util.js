const getPageName = (url) => {
  let Arr = url.split('/');
  let PageName = Arr[Arr.length-1];
  return PageName.indexOf('.html') > 0 ? PageName.replace('.html','') : PageName
}

module.exports = {
  getPageName
}