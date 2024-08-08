const hamburgerMenu = document.querySelector('.hamburger-menu')
const hamburgerLines = hamburgerMenu.querySelectorAll('.line')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileMenuItem = mobileMenu.querySelectorAll('a')
const navItems = document.querySelectorAll('.nav-item a')
const scrollSpySectionsIndex = document.querySelectorAll('.scrollspy')
const scrollSpySectionContact = document.querySelector('.scrollspy-contact')

const username = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const sendBtn = document.querySelector('.send-btn')
const closeBtn = document.querySelector('.close-btn')
const popup = document.querySelector('.popup')

const footerYear = document.querySelector('.footer-year')

const showMobileMenu = params => {
	mobileMenu.classList.add('mobile-menu-active')
	hamburgerLines.forEach(line => {
		line.classList.toggle('menu-line')
		line.classList.toggle('cross-line')

		if (line.classList.contains('menu-line')) {
			mobileMenu.classList.remove('mobile-menu-active')
		}
	})
}

const closeMobileMenu = () => {
	mobileMenu.classList.remove('mobile-menu-active')
	hamburgerLines.forEach(line => {
		line.classList.remove('cross-line')
		line.classList.add('menu-line')
	})
}

const handleScrollSpy = params => {
	if (document.body.classList.contains('main-page')) {
		const sections = []

		scrollSpySectionsIndex.forEach(section => {
			// console.log(window.scrollY)
			// wartość scrolla
			// console.log(section.offsetTop)
			// odległość danej sekcji od górnej krawędzi przeglądarki
			// console.log(section.offsetHeight)
			// wysokość każdej z sekcji

			const removeClassActive = params => {
				navItems.forEach(item => item.classList.remove('active'))
			}

			if (window.scrollY <= section.offsetTop + section.offsetHeight - 70) {
				sections.push(section)

				const activeSection = document.querySelector(`#nav-desktop-${sections[0].id}`)

				removeClassActive()

				activeSection.classList.add('active')
			}
		})
	} else if (document.body.classList.contains('contact-page')) {
		const homeLink = navItems[0]
		const contactLink = navItems[navItems.length - 1]

		homeLink.classList.remove('active')
		contactLink.classList.add('active')
	}
}

const showError = (input, msg) => {
	const formBox = input.parentElement

	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact-box')

	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}

const handleCurrentYear = () => {
	const year = (new Date).getFullYear()
	footerYear.innerHTML = year
}

handleCurrentYear()

hamburgerMenu.addEventListener('click', showMobileMenu)
mobileMenuItem.forEach(item => item.addEventListener('click', closeMobileMenu))
window.addEventListener('scroll', handleScrollSpy)

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([username, email, message])
	checkEmail(email)
	checkErrors()
	window.scrollTo(0, 0)
})
