// const service = require('../service');
// const Profile = require('../Models/Profile');


// CREATE PROFILE + GENERATE QR


const service = require("../service");
const Profile = require("../Models/Profile");

// CREATE PROFILE + GENERATE QR
exports.generateQR = async (req, res) => {
    try {
        console.log(req.body); // 🔥 keep this while testing

        const {
            name,
            about,
            company,
            website,
            phone,
            email,
            location,
             contactTitle = [],
             contactValue = [],
            socialTitle = [],
            socialLink = []
        } = req.body;

        const formattedSocialLinks = [];

        for (let i = 0; i < socialTitle.length; i++) {
            if (socialTitle[i] && socialLink[i]) {
                formattedSocialLinks.push({
                    title: socialTitle[i],
                    url: socialLink[i]
                });
            }
        }

        const formattedContacts = [];

for (let i = 0; i < contactTitle.length; i++) {
    if (contactTitle[i] && contactValue[i]) {
        formattedContacts.push({
            title: contactTitle[i],
            value: contactValue[i]
        });
    }
}


        const newProfile = new Profile({
            name,
            about,
            company,
            website,
            phone,
            email,
            location,
            contacts: formattedContacts, 
            socialLinks: formattedSocialLinks,
            image: req.file ? req.file.filename : null
        });

        const savedProfile = await newProfile.save();

const profileUrl = `https://digital-profile-backend-production-aa53.up.railway.app/profile/${savedProfile._id}`;        const qrCodeBuffer = await service.generateQRCode(profileUrl);

        res.json({ qrCode: qrCodeBuffer.toString("base64") });
//         res.json({
//   profileId: savedProfile._id
// });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




// VIEW PROFILE PAGE
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.send("Profile not found");
        }

        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>${profile.name} - Digital Profile</title>
<button id="themeToggle" style="
    position:absolute;
    top:16px;
    right:16px;
    border-radius:50%;
    width:40px;
    height:40px;
    font-size:18px;
">
🌙
</button>
 
<style>
/* RESET */
* {
    box-sizing: border-box;
}

/* PAGE */
body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    margin: 0;
    padding: 40px 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
}

/* CARD */
.card {
    background:lightblue;
    max-width: 500px;
    width: 100%;
    padding: 28px;
    border-radius: 18px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.25);
    text-align: center;

    /* Animation */
    animation: fadeUp 0.8s ease-out;
    transform-origin: center;
    .card { position: relative; }

}

/* FADE ANIMATION */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* PROFILE IMAGE */
.card img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    border: 4px solid #667eea;

    transition: transform 0.4s ease;
}

.card img:hover {
    transform: scale(1.08) rotate(1deg);
}

/* NAME */
h2 {
    margin: 10px 0 6px;
    font-size: 23px;
    font-weight: 700;
    color: #222;
}
/* ABOUT BOX */
.about-box {
    margin: 14px 0 18px;
    padding: 14px 16px;

    background: rgba(255, 255, 255, 0.65); /* frosted look */
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.4);

    color: #333;
    font-size: 14px;
    line-height: 1.5;

    box-shadow: 0 8px 20px rgba(0,0,0,0.15);

    word-break: break-word;
    overflow-wrap: anywhere;
}

/* Dark mode support (optional) */
body.dark .about-box {
    background: rgba(20, 20, 20, 0.55);
    color: #f1f1f1;
    border-color: rgba(255,255,255,0.12);
}


/* TEXT */
p {
    margin: 6px 0;
    color: #555;
    font-size: 14px;
    line-height: 1.4;
}

/* LINKS */
a {
    display: block;
    padding: 12px;
    margin: 10px 0;
    border-radius: 10px;
    background: linear-gradient(135deg, #f1f3f6, #e6e9ef);
    color: #333;
    text-decoration: none;
    font-weight: 600;

    transition: all 0.3s ease;
}

a:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

/* BUTTONS */
button {
    padding: 10px 18px;
    margin: 10px 5px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}

button:first-of-type {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: #fff;
}

button:last-of-type {
    background: linear-gradient(135deg, #dc3545, #ff6b6b);
    color: #fff;
}

/* MOBILE FRIENDLY */
@media (max-width: 420px) {
    .card {
        padding: 22px;
    }
}

/* SOCIAL LINKS ONLY */
.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 10px 18px;
    margin: 6px;

    border-radius: 999px; /* fully rounded */
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;

    font-size: 14px;
    font-weight: 600;
    text-decoration: none;

    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    transition: all 0.3s ease;
}

.social-link:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 22px rgba(0,0,0,0.35);
}


/* ===================== */
/* THEME VARIABLES */
/* ===================== */
:root {
    --bg-main: linear-gradient(135deg, #eef1f5, #dfe3ea);
    --card-bg: #ffffff;
    --text-main: #222;
    --text-muted: #555;
    --border-soft: rgba(0,0,0,0.08);
}

body.dark {
    --bg-main: linear-gradient(135deg, #0f172a, #020617);
    --card-bg: rgba(20, 20, 20, 0.85);
    --text-main: #f1f5f9;
    --text-muted: #cbd5e1;
    --border-soft: rgba(255,255,255,0.12);
}

/* ===================== */
/* APPLY VARIABLES */
/* ===================== */
body {
    background: var(--bg-main);
    transition: background 0.4s ease;
}

.card {
    background: var(--card-bg);
    color: var(--text-main);
    border: 1px solid var(--border-soft);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: background 0.4s ease, color 0.4s ease;
}

h2 {
    color: var(--text-main);
}

p {
    color: var(--text-muted);
}

/* ABOUT BOX */
.about-box {
    background: rgba(255,255,255,0.65);
}

body.dark .about-box {
    background: rgba(30,30,30,0.65);
}

/* NORMAL LINKS */
a {
    background: rgba(255,255,255,0.85);
    color: var(--text-main);
}

body.dark a {
    background: rgba(30,30,30,0.85);
}

/* SOCIAL LINKS */
.social-link {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

/* BUTTONS DARK FIX */
body.dark button:first-of-type {
    background: linear-gradient(135deg, #22c55e, #16a34a);
}

body.dark button:last-of-type {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}
 
</style>


</head>
<body>

<div class="card">
<img src="/uploads/${profile.image}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;"><br>

<h2>${profile.name}</h2>
<p class="about-box"><strong>${profile.about}</strong></p>


${profile.phone ? `<a href="tel:${profile.phone}">📞 ${profile.phone}</a>` : ""}
${profile.email ? `<a href="mailto:${profile.email}">✉️ ${profile.email}</a>` : ""}

<!--${profile.contacts.map(c => `-->
<!--    <a href="${c.value}">${c.title}</a>-->
<!--`).join("")}-->

${profile.socialLinks.map(link => `
    <a href="${link.url}" class="social-link" target="_blank">
        ${link.title}
    </a>
`).join("")}

<p><strong>📍 Location:</strong> ${profile.location}</p>


<button onclick="editProfile()">Edit</button>
<button onclick="deleteProfile()">Delete</button>
</div>
<script>
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.onclick = () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
};
</script>
 


</head>
<body>

<div class="card">
<img src="/uploads/${profile.image}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;"><br>

<h2>${profile.name}</h2>
<p><strong>${profile.about}</strong></p>


${profile.phone ? `<a href="tel:${profile.phone}">📞 ${profile.phone}</a>` : ""}
${profile.email ? `<a href="mailto:${profile.email}">✉️ ${profile.email}</a>` : ""}

${profile.contacts.map(c => `
    <a href="${c.value}">${c.title}</a>
`).join("")}

${profile.socialLinks.map(link => `
    <a href="${link.url}" target="_blank">${link.title}</a>
`).join("")}

<p><strong>📍 Location:</strong> ${profile.location}</p>


<button onclick="editProfile()">Edit</button>
<button onclick="deleteProfile()">Delete</button>
</div>

<script>
function editProfile() {
    const newName = prompt("Name:", "${profile.name}");
    const newAbout = prompt("About:", "${profile.about}");
    const newCompany = prompt("Company:", "${profile.company}");
    const newWebsite = prompt("Website:", "${profile.website || ""}");

    fetch("/profile/${profile._id}", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            about: newAbout,
            company: newCompany,
            website: newWebsite
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Updated Successfully");
        location.reload();
    });
}

function deleteProfile() {
    if (confirm("Are you sure?")) {
        fetch("/profile/${profile._id}", { method: "DELETE" })
        .then(() => {
            alert("Deleted");
            window.location.href = "/";
        });
    }
}
</script>

</body>
</html>
        `);

    } catch (err) {
        res.status(500).send("Error fetching profile");
    }
};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).send("Profile not found");
        }

        res.json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (err) {
        res.status(500).send("Error updating profile");
    }
};



// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);

        if (!deletedProfile) {
            return res.status(404).send("Profile not found");
        }

        res.json({
            message: "Profile deleted successfully"
        });

    } catch (err) {
        res.status(500).send("Error deleting profile");
    }
};
