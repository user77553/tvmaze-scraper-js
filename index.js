const inputEl = document.getElementById("input-el")
const buttonEl = document.getElementById("btn-el")
let show = {}

buttonEl.addEventListener("click", function() {
  let request = new XMLHttpRequest()
  request.open('GET', 'https://api.tvmaze.com/shows/' + inputEl.value, true)
  request.onload = function () {
    show = JSON.parse( request.response )

    const mydate = new Date(show["premiered"]);
    const genres = show["genres"].toString().replaceAll(",",", ")
    const rating = show["rating"]["average"]
    const imdb = show["externals"]["imdb"]
    let result = ""
    result += `
    <table>
      <tr>
        <td>
          <h2><a target="_new" href="${ show["url"] }">${ show["name"] } - ${ mydate.getFullYear() }</a></h2>
        </td>
        <td>
          <p>Genres: ${ genres }</p>
        </td>`
        if (rating) {
          result +=
        `<td>
          <p>Rating: ${ rating }</p>
        </td>
        `}
        if(imdb) {
          result +=
        `<td>
          <p><a target="_new" href="https://www.imdb.com/title/${ show["externals"]["imdb"] }">IMDb</a></p>
        </td>`
        }
        result +=
      `</tr>
      <tr>
        <td><img src="${ show["image"]["medium"] }"></td>
        <td colspan="3">${ show["summary"] }</td>
      </tr>
    </table>
    `
    document.getElementById("response").innerHTML = result
  }
  request.send()
})
