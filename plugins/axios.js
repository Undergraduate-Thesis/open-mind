export default function({ $axios, redirect }) {
  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  // })
  // Set header
  if (process.browser) {
    $axios.setToken(localStorage.getItem("access_token"), "Bearer");
  }
  $axios.onError(error => {
    console.log(error.response);
    const code = parseInt(error.response && error.response.status);
    if (code === 404) {
      redirect("/404");
    } else if (code === 401) {
      console.log("error axios ini");
    }
  });
}
