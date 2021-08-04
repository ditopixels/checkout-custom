const d = document

export function setGeneral(){
    const orderForm = d.querySelector('.orderform-template-holder')
    orderForm.classList.remove('shipping')
    orderForm.classList.remove('email')
    orderForm.classList.remove('payment')
    orderForm.classList.remove('profile')
    orderForm.classList.add(location.hash.replace('#/',''))
}

export function loadTargets (){
    setGeneral()
    switch (location.hash) {
        case "#/email":
            console.log("desde email")
            break;
        case "#/profile":
            console.log("desde profile")
            deleteEmail()
            break;
        case "#/shipping":
            console.log("desde shipping")
            deleteEmail()
            break;
        case "#/payment":
            console.log("desde payment")
            deleteEmail()
            break;
    }
}

export function deleteEmail (){
    const email = d.querySelector('#client-profile-data>.client-pre-email')
    email.outerHTML=''
}

export function loadBreadCrumb () {
    const panel = d.querySelector(".orderform-template-holder > .row-fluid")
    const breadcrumb = d.createElement('div')
    const navProfile = d.createElement('div')
    const navShipping = d.createElement('div')
    const navPayment = d.createElement('div')

    navProfile.textContent = 'Datos personales'
    navShipping.textContent = 'Métodos de entrega'
    navPayment.textContent = 'Método de pago'

    breadcrumb.classList.add('breadcrumb')
    navProfile.classList.add('breadcrumb-profile')
    navPayment.classList.add('breadcrumb-payment')
    navShipping.classList.add('breadcrumb-shipping')

    breadcrumb.appendChild(navProfile)
    breadcrumb.appendChild(navShipping)
    breadcrumb.appendChild(navPayment)

    panel.insertAdjacentElement('beforebegin',breadcrumb)
}