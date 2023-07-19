document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/ramens')
    .then(resp=> resp.json())
    .then(data=>{
        moreInfo(data[0])
        data.forEach(ramen=>addRamen(ramen))
    })

})

function addRamen(ramen){
    const menu = document.getElementById('ramen-menu')
    const image = document.createElement('img')
    image.src = ramen.image
    image.id = ramen.id

    menu.appendChild(image)
    image.addEventListener('click', e=>{
        e.preventDefault()
        fetch(`http://localhost:3000/ramens/${e.target.id}`)
        .then(resp=>resp.json())
        .then(data=>moreInfo(data))
    })
}

function moreInfo(data){
    const image = document.querySelector('#ramen-detail .detail-image')
    image.src = data.image
    image.alt = data.name

    document.querySelector('#ramen-detail .name').innerText = data.name
    document.querySelector('#ramen-detail .restaurant').innerText = data.restaurant
    document.getElementById('rating-display').innerText = data.rating
    document.getElementById('comment-display').innerText = data.comment
}