document.addEventListener("DOMContentLoaded", function() {
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");
    const filterBtn = document.querySelector("#good-dog-filter")

    fetch('http://localhost:3000/pups')
    .then((res) => res.json())
    .then((data) => {
        for (dog of data) {
            const dogSpan = document.createElement('span');
            dogSpan.innerHTML = dog.name
            dogBar.appendChild(dogSpan)

            dogSpan.addEventListener('click', function() {
                const dog = data.find((dog) => this.innerHTML === dog.name)
                dogInfo.innerHTML = `
                <img src=${dog.image} />
                <h2>${dog.name}</h2>
                <button id=dog-btn>${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
                `

                const dogBtn = document.querySelector("#dog-btn")
                dogBtn.addEventListener("click", function() {
                    dog.isGoodDog = !dog.isGoodDog;
                    this.innerHTML = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
                    fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dog)
                    })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                })
                
            })
        }
    })

    let active = false
    function toggle() {
        active = !active
        if (active) {
            filterBtn.classList.add('active')
            filterBtn.innerHTML = "Filter good dogs: ON"
        } else {
            filterBtn.classList.remove('active')
            filterBtn.innerHTML = "Filter good dogs: OFF"
        }
    }

    filterBtn.addEventListener('click', function() {
        toggle()
    })

})
