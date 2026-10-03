/* =========================
   LOADER
========================= */

function dismissLoader() {

    window.setTimeout(() => {
        document.getElementById("loader").classList.add("loaded");
    }, 250);

}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", dismissLoader, { once: true });
} else {
    dismissLoader();
}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
    document.querySelector(".menu-btn").setAttribute(
        "aria-expanded",
        nav.classList.contains("active")
    );

}


/* =========================
   BOOKING MODAL
========================= */

const modal =
    document.getElementById("bookingModal");

const selectedService =
    document.getElementById("selectedService");


function openBooking(service) {

    selectedService.textContent = service;
    const normalizedService = service.toLowerCase();
    const serviceMap = new Map([
        ["ac repair & service", "AC Repair & Service"],
        ["ac service", "AC Repair & Service"],
        ["refrigerator repair", "Refrigerator Repair"],
        ["refrigerator service", "Refrigerator Repair"],
        ["washing machine repair", "Washing Machine Repair"],
        ["washing machine service", "Washing Machine Repair"],
        ["ro service", "RO Service"],
        ["geyser repair", "Geyser Repair"],
        ["geyser service", "Geyser Repair"],
    ]);

    document.getElementById("appliance").value =
        serviceMap.get(normalizedService) || "";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.getElementById("customerName").focus();

}

function selectService(service) {

    openBooking(service);

}


function closeBooking() {

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

}


modal.addEventListener("click", function(e) {

    if (e.target.matches("[data-close-booking]")) {
        closeBooking();
    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeBooking();
    }

});


/* =========================
   BOOKING → WHATSAPP
========================= */

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();


        const name =
            document
                .getElementById("customerName")
                .value.trim();


        const phone =
            document
                .getElementById("customerPhone")
                .value.trim();


        const location =
            document
                .getElementById("location")
                .value.trim();


        const problem =
            document
                .getElementById("problem")
                .value.trim();


        if (
            name === "" ||
            phone === "" ||
            location === ""
        ) {

            alert(
                "Please fill Name, Mobile Number and Location."
            );

            return;

        }


        if (phone.length !== 10) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            return;

        }

        if (!document.getElementById("appliance").checkValidity()) {
            alert("Please select an appliance service.");
            return;
        }


        const service =
            document.getElementById("appliance").value ||
            selectedService.textContent;


        const message =
`Hello SRM Mechanic,

I want to book an appliance service.

Service: ${service}

Customer Name:
${name}

Mobile:
${phone}

Location:
${location}

Problem:
${problem || "Not specified"}

Please contact me regarding the service.

Thank you.`;


        const whatsapp =
            "https://wa.me/919588398563?text=" +
            encodeURIComponent(message);


        window.open(whatsapp, "_blank");

        closeBooking();

    });


/* =========================
   PHONE VALIDATION
========================= */

document
    .getElementById("customerPhone")
    .addEventListener("input", function() {

        this.value =
            this.value.replace(/\D/g, "");

    });


/* =========================
   FAQ
========================= */

function toggleFAQ(button) {

    const item =
        button.parentElement;


    document
        .querySelectorAll(".faq-item")
        .forEach(other => {

            if (other !== item) {
                other.classList.remove("active");
            }

        });


    item.classList.toggle("active");
    button.setAttribute("aria-expanded", item.classList.contains("active"));

}


/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll(".counter");


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);


        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));


        const update = () => {

            current += increment;

            if (current >= target) {

                current = target;

            }


            counter.textContent =
                current.toLocaleString() +
                (target === 100 ? "%" : "+");


            if (current < target) {

                requestAnimationFrame(update);

            }

        };


        update();

    });

}


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                }

            });

        },
        {
            threshold: .3
        }
    );


const numbers =
    document.querySelector(".numbers");


if (numbers) {
    observer.observe(numbers);
}


/* =========================
   NAVIGATION CLOSE
========================= */

document
    .querySelectorAll("#nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .getElementById("nav")
                .classList.remove("active");

            document.querySelector(".menu-btn").setAttribute("aria-expanded", "false");

        });

    });


/* =========================
   3D MOUSE INTERACTION
========================= */

const appliance =
    document.querySelector(".appliance-3d");


const visual =
    document.querySelector(".hero-visual");


if (visual && appliance) {

    visual.addEventListener(
        "mousemove",
        function(e) {

            const rect =
                visual.getBoundingClientRect();


            const x =
                e.clientX - rect.left;


            const y =
                e.clientY - rect.top;


            const rotateY =
                ((x / rect.width) - .5) * 25;


            const rotateX =
                ((y / rect.height) - .5) * -15;


            appliance.style.animation =
                "none";


            appliance.style.transform =
                `translate(-50%,-50%)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );


    visual.addEventListener(
        "mouseleave",
        function() {

            appliance.style.animation =
                "machineFloat 5s ease-in-out infinite";

        }
    );

}