# WarmPaws – Pet Care in Winter 🐾❄️

A cozy winter companion platform for pet owners to ensure their furry friends stay warm, safe, and healthy during the cold season. Explore local pet care services, winter pet clothing, grooming options, and expert tips — all in one friendly interface.

---

## 🔗 Live Demo

[View Live Site](https://warmpaws-petcare-7542b.web.app/)

---

## 💡 Project Purpose

WarmPaws is designed to help pet owners care for their pets during winter. From professional grooming and paw treatments to cozy outfits and expert advice, this SPA ensures pets stay happy, warm, and healthy.

---

## 🖥️ Key Features

- **Responsive Design:** Fully responsive on mobile, tablet, and desktop.
- **SPA Behavior:** Smooth route-based content loading without errors on reload.
- **Authentication:**
  - Signup/Login with email & password
  - Google social login
  - Protected service details page
- **Pet Care Services:** Dynamic service cards generated from JSON data.
- **Service Booking:** Simple booking form with toast notifications.
- **Profile Management:** View and update user profile.
- **Winter Tips & Expert Vets:** Informative sections for pet care.
- **Animations:** Subtle animations using Swiper.js and react-hot-toast.
- **Extra Section:** Added a unique section to enhance user engagement.

---

## 🛠️ Technologies & NPM Packages Used

- **React.js** – Frontend library
- **React Router DOM** – Routing and SPA management
- **Firebase Auth** – Authentication and protected routes
- **react-hot-toast** – Toast notifications
- **Swiper.js** – Hero slider and carousel
- **Tailwind CSS** – Styling and responsive design
- **AOS** – Scroll animations
- **Environment Variables** – Secure Firebase configuration keys

---

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Navbar, Footer, Cards, etc.
├── pages/           # Home, Login, Signup, Profile, ServiceDetails
├── provider/        # AuthProvider for Firebase auth
├── data/            # JSON file for pet care services
└── App.jsx
```

---

## 🐾 JSON Data Example

```json
[
  {
    "serviceId": 1,
    "serviceName": "Winter Coat Fitting for Dogs",
    "providerName": "PawCare Studio",
    "providerEmail": "info@pawcare.com",
    "price": 25,
    "rating": 4.9,
    "slotsAvailable": 4,
    "description": "Custom coat fitting and warm outfit options to keep your dog comfortable in the cold.",
    "image": "https://i.postimg.cc/example1.png",
    "category": "Clothing"
  }
]
```

---

## ✅ Usage

1. Clone the repository:

```bash
git clone https://github.com/MFRRayhan/warm-paws-pet-care.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the project locally:

```bash
npm start
```

4. Build for production:

```bash
npm run build
```

---

## 📌 Author

Md. Fazle Rabbi Rayhan
Email: md.fazlerabbirayhan786@gmail.com
GitHub: [https://github.com/MFRRayhan](https://github.com/MFRRayhan)

---

## ⚠️ Notes

- Ensure all routes work properly without reload errors.
- Toast notifications are used for both success and error messages.
- Extra section added to homepage to enhance user engagement.
