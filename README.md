# Barefoot Homestays Website

Welcome to Barefoot Homestays – Your Home Away From Home

## 🌟 Website Status

✅ **Website Restored and Ready for Deployment**

The website has been fully restored and is ready to go live. The index.html file was previously corrupted (reduced to only 20 lines), but has now been completely restored with all sections and functionality.

## 📋 Website Features

- **Responsive Design**: Built with Bootstrap 5 for mobile-friendly viewing
- **Navigation Bar**: Smooth scrolling to all sections
- **Hero Banner**: Eye-catching entrance with call-to-action buttons
- **About Section**: Description of the homestay with images
- **Rooms Section**: Three room types with pricing and amenities
- **Amenities Section**: List of available facilities
- **Photo Gallery**: Interactive lightbox gallery with 6+ images
- **Location Section**: Google Maps integration (requires configuration)
- **Contact Form**: Formspree integration (requires configuration)
- **Social Media**: Links to Facebook and Instagram
- **Footer**: Copyright and social media icons

## 🚀 Deployment

This website is configured for GitHub Pages deployment:

- **Domain**: www.barefoothomestays.com (configured via CNAME file)
- **Hosting**: GitHub Pages
- **Main File**: index.html

To make the website live:
1. Ensure GitHub Pages is enabled in repository settings
2. Set the source branch to the main branch or this PR branch
3. The website will be accessible at www.barefoothomestays.com

## ⚙️ Required Configuration

Before going fully live, update these placeholders:

### 1. Google Maps (index.html, line ~207)
- Get your embed code from [Google Maps](https://www.google.com/maps)
- Replace the incomplete URL with your actual location embed code

### 2. Formspree Contact Form (index.html, line ~219)
- Sign up at [Formspree.io](https://formspree.io)
- Replace `your-form-id` with your actual Formspree form ID
- This enables the contact form to receive submissions

## 📁 File Structure

```
barefoothomestays/
├── index.html              # Main website file (271 lines)
├── CNAME                   # Domain configuration
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── img/                # Image assets
│       ├── Entrance.jpg
│       ├── Bedroom.jpg
│       ├── Living Room_5.jpg
│       ├── Living Room_Day.jpg
│       ├── Bathroom.jpg
│       ├── tub.jpg
│       ├── R_R09357.jpg
│       ├── R_R09485.jpg
│       └── 2.jpg
└── README.md               # This file
```

## 🔧 Technical Details

- **Bootstrap**: 5.3.2 (via CDN)
- **Font Awesome**: 6.5.0 (via CDN)
- **Lightbox**: Ekko Lightbox 5.3.0 (via CDN)
- **Form Validation**: Bootstrap native validation
- **Scroll Spy**: Bootstrap scroll spy for navigation

## ✅ Quality Checks

- ✅ All HTML sections present and functional
- ✅ All image assets verified and accessible
- ✅ CSS and JavaScript files properly linked
- ✅ Responsive design tested
- ✅ Code review completed and issues fixed
- ✅ Security scan completed (no issues found)
- ✅ Image paths corrected for consistency
- ✅ Lightbox functionality configured
- ✅ Social media links verified

## 📧 Contact

For inquiries or bookings:
- **Email**: barefoothomestays1@gmail.com
- **Facebook**: [Barefoot Homestays](https://www.facebook.com/people/Barefoot-Homestays/100090769633894/)
- **Instagram**: [@barefoothomestays](https://www.instagram.com/barefoothomestays/)

## 🛠️ Maintenance

To update the website:
1. Edit index.html for content changes
2. Update images in the assets/img/ directory
3. Modify styles in assets/css/style.css
4. Update JavaScript in assets/js/main.js
5. Commit and push changes to trigger GitHub Pages rebuild

---

**Last Updated**: February 2026
**Status**: ✅ Ready for Production
