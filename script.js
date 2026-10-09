document.addEventListener("DOMContentLoaded", function () {

    /* ================= HEADER ================= */

    const header = document.getElementById("header");

    function checkHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", checkHeader);

    checkHeader();


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");

    const mobileMenu = document.getElementById("mobileMenu");


    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function () {

            menuBtn.classList.toggle("active");

            mobileMenu.classList.toggle("active");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                menuBtn.classList.remove("active");

                mobileMenu.classList.remove("active");

            });

        });


        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                menuBtn.classList.remove("active");

                mobileMenu.classList.remove("active");

            }

        });

    }


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".desktop-nav .nav-link");


    function updateActiveNav() {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* ================= BACK TO TOP ================= */

    const backTop =
        document.getElementById("backTop");


    if (backTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 600) {

                    backTop.classList.add("show");

                } else {

                    backTop.classList.remove("show");

                }

            }
        );


        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* ================= WEBSITE SHARE ================= */

    const shareBtn =
        document.getElementById("shareBtn");


    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            async function () {

                const shareData = {

                    title: "Vemium Interior",

                    text:
                        "Explore Vemium - Premium Interior Design & Execution.",

                    url: window.location.href

                };


                try {

                    if (navigator.share) {

                        await navigator.share(
                            shareData
                        );

                    } else if (
                        navigator.clipboard
                    ) {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );

                        alert(
                            "Website link copied!"
                        );

                    } else {

                        prompt(
                            "Copy this website link:",
                            window.location.href
                        );

                    }

                } catch (error) {

                    console.log(
                        "Share cancelled"
                    );

                }

            }
        );

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");

    const submitBtn =
        document.getElementById("submitBtn");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const action =
                    contactForm.getAttribute(
                        "action"
                    );


                if (
                    !action ||
                    action.includes(
                        "YOUR_FORMSPREE_ID"
                    )
                ) {

                    formMessage.textContent =
                        "Please connect your Formspree email first.";

                    formMessage.style.color =
                        "#b00020";

                    return;

                }


                submitBtn.disabled = true;

                submitBtn.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';


                try {

                    const response =
                        await fetch(
                            action,
                            {

                                method: "POST",

                                body:
                                    new FormData(
                                        contactForm
                                    ),

                                headers: {

                                    "Accept":
                                        "application/json"

                                }

                            }
                        );


                    if (response.ok) {

                        formMessage.textContent =
                            "Thank you! Your enquiry has been sent successfully.";

                        formMessage.style.color =
                            "#222";

                        contactForm.reset();

                    } else {

                        throw new Error(
                            "Form submission failed"
                        );

                    }

                } catch (error) {

                    formMessage.textContent =
                        "Something went wrong. Please try again or contact us directly.";

                    formMessage.style.color =
                        "#b00020";

                }


                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    'Send Enquiry <i class="fa-solid fa-arrow-right"></i>';

            }
        );

    }


    /* ================= YEAR ================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});