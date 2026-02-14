# Contact Form Setup Guide

## Problem
The contact form shows an error: **"Form not found. Please check the form hashid"**

## Solution
This happens because the form needs to be connected to a form handling service. We've updated the website to use **Web3Forms** (recommended) or **Formspree** (alternative).

---

## Quick Setup with Web3Forms (Recommended)

### Why Web3Forms?
- ✅ **Easier setup** - Just need an access key (no form ID required)
- ✅ **More generous free plan** - 250 submissions/month (vs Formspree's 50)
- ✅ **Faster integration** - Takes less than 1 minute
- ✅ **Better spam protection** - Built-in honeypot field
- ✅ **No credit card required** for free plan

### Setup Steps (Takes 30 seconds!)

1. **Sign up at Web3Forms**
   - Go to [https://web3forms.com](https://web3forms.com)
   - Click "Get Started for Free"
   - Enter your email: `barefoothomestays1@gmail.com`
   - Create a password

2. **Verify your email**
   - Check your inbox for the verification email
   - Click the verification link

3. **Get your access key**
   - Log in to your Web3Forms dashboard
   - Copy your access key (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

4. **Update index.html**
   - Open `index.html` in a text editor
   - Find line 362 (search for `YOUR_WEB3FORMS_ACCESS_KEY`)
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key
   
   **Before:**
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
   
   **After:**
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7890-abcd-ef1234567890">
   ```

5. **Save and deploy**
   - Save the file
   - Commit and push to GitHub
   - Your contact form is now working!

### Testing
1. Visit your website: [www.barefoothomestays.com](https://www.barefoothomestays.com)
2. Scroll to the contact form
3. Fill in a test message
4. Click "Send Request"
5. Check your email inbox for the submission

---

## Alternative: Setup with Formspree

If you prefer to use Formspree instead:

### Setup Steps

1. **Sign up at Formspree**
   - Go to [https://formspree.io](https://formspree.io)
   - Sign up with your email

2. **Create a new form**
   - Click "New Form"
   - Enter your email: `barefoothomestays1@gmail.com`
   - Give it a name like "Contact Form"
   - Copy your form ID (it will look like: `abc123xyz`)

3. **Update index.html**
   - Find line 360 and change the form action:
   
   **Change this:**
   ```html
   <form action="https://api.web3forms.com/submit" method="POST" ...>
   ```
   
   **To this:**
   ```html
   <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST" ...>
   ```

   - Remove or comment out the Web3Forms specific hidden inputs (lines 362-371):
   ```html
   <!-- Remove these Web3Forms fields when using Formspree
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   <input type="hidden" name="subject" value="New Booking Inquiry from Barefoot Homestays Website">
   <input type="checkbox" name="botcheck" style="display: none;">
   -->
   ```

   - Change the email field name attribute from `name="email"` to `name="_replyto"` (line 380):
   ```html
   <input type="email" class="form-control" id="email" name="_replyto" required>
   ```

4. **Save and deploy**
   - Save the file
   - Commit and push to GitHub

---

## Troubleshooting

### "Form not found" error persists
- **Check that you replaced the placeholder** with your actual access key or form ID
- **Make sure you saved the file** and pushed changes to GitHub
- **Clear your browser cache** and refresh the page

### Not receiving emails
- **Check spam folder** - Form submissions might end up in spam
- **Verify your email address** with the service (Web3Forms or Formspree)
- **Check the service dashboard** - Most services show submissions even if email fails

### Form validation not working
- The Bootstrap validation is already set up in `assets/js/main.js`
- Make sure you're not blocking JavaScript
- Check browser console for errors (F12 → Console tab)

---

## Features Included

Both services provide:
- ✅ Email notifications for each submission
- ✅ Spam protection
- ✅ Data storage (30 days for Web3Forms, varies for Formspree)
- ✅ Mobile-friendly forms
- ✅ No backend code required

---

## Support

- **Web3Forms Help:** [https://docs.web3forms.com](https://docs.web3forms.com)
- **Formspree Help:** [https://help.formspree.io](https://help.formspree.io)

---

## Summary

Your contact form is now configured with clear instructions. You just need to:
1. Sign up at [Web3Forms](https://web3forms.com) (recommended)
2. Get your access key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in index.html with your actual key
4. Deploy the changes

**That's it!** Your contact form will be fully functional.
