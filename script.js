const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearFormErrors();

    const formData = new FormData(contactForm);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    // ===============================
    // Validation
    // ===============================

    if (!data.name.trim()) {
        showError("name", "Please enter your name.");
        return;
    }

    if (!data.email.trim()) {
        showError("email", "Please enter your email.");
        return;
    }

    if (!isValidEmail(data.email)) {
        showError("email", "Please enter a valid email address.");
        return;
    }

    if (!data.subject.trim()) {
        showError("subject", "Please enter a subject.");
        return;
    }

    if (!data.message.trim()) {
        showError("message", "Please enter your message.");
        return;
    }

    // ===============================
    // Sending
    // ===============================

    setLoading(true);

    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status";

    try {

        const response = await fetch("/api/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(data)
        });

        // Get response as text first
        const responseText = await response.text();

        console.log("Server response:", responseText);

        // Try converting response to JSON
        let result;

        try {
            result = JSON.parse(responseText);
        } catch (jsonError) {

            console.error("Server did not return JSON:", responseText);

            throw new Error(
                "The server returned an invalid response. Make sure the Node.js backend is running on port 3000."
            );
        }

        // Server error
        if (!response.ok) {
            throw new Error(
                result.message || "Unable to send your message."
            );
        }

        // ===============================
        // SUCCESS
        // ===============================

        contactForm.reset();

        formStatus.textContent =
            "Thank you! Your message has been received successfully.";

        formStatus.className = "form-status success";

    } catch (error) {

        console.error("Contact form error:", error);

        formStatus.textContent =
            error.message ||
            "Something went wrong. Please try again.";

        formStatus.className = "form-status error";

    } finally {

        setLoading(false);
    }
});


// ===============================
// Helper Functions
// ===============================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


function showError(fieldId, message) {

    const field = document.getElementById(fieldId);

    field.classList.add("invalid");

    formStatus.textContent = message;

    formStatus.className = "form-status error";

    field.focus();

}


function clearFormErrors() {

    document
        .querySelectorAll(".invalid")
        .forEach((field) => {
            field.classList.remove("invalid");
        });

}


function setLoading(isLoading) {

    submitButton.disabled = isLoading;

    if (isLoading) {

        submitButton.querySelector("span").textContent =
            "Sending...";

    } else {

        submitButton.querySelector("span").textContent =
            "Send Message";
    }
}