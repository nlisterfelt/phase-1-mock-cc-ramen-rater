document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/ramens')
    .then(resp=> resp.json())
    .then(data=>{
        moreInfo(data[0])
        data.forEach(ramen=>addRamen(ramen))
    })

    const form = document.getElementById('new-ramen')
    form.addEventListener('submit', e=>{
        e.preventDefault()
        const newInfo = e.target.elements
        ramenObj = {
            name: newInfo[0].value,
            restaurant: newInfo[1].value,
            image: newInfo[2].value,
            rating: newInfo[3].value,
            comment: newInfo[4].value
        }
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(ramenObj)
        })
        .then(resp=>resp.json())
        .then(data=>{addRamen({id: data.id, ...ramenObj})})
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
