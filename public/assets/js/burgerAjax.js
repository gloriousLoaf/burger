// AJAX to database
$(function () {
    // listener to call ajax & create new burger
    $(`.create-form`).on(`submit`, function (event) {
        event.preventDefault();
        // Change alert to Boostrap modal?
        if ($(`#newBurger`).val().trim() === ``) {
            alert(`Nothing to eat? Please type something.`);
            return false;
        }
        else {
            let newBurger = {
                name: $(`#newBurger`).val().trim(),
                devoured: 0
            };
            console.log(newBurger);
            $.ajax(`/api/burgers`, {
                type: `POST`,
                data: newBurger
            }).then(function () {
                console.log(`New tasty burger on deck!`);
                location.reload();
            })
        }
    })
    // and to devour a burger
    $(`.devour`).on(`click`, function (event) {
        event.preventDefault();
        let id = $(this).data(`id`);
        let isDevoured = {
            devoured: 1
        };
        $.ajax(`/api/burgers/${id}`, {
            type: `PUT`,
            data: isDevoured
        }).then(function () {
            console.log(`Now that's a tasty burger!`);
            location.reload();
        })
    })
});