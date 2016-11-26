---
layout: post
title:  "How to use custom HTML email templates with Mailchimp"
description: Learn how to set up Mailchimp to use your custom responsive HTML email templates
tags: tutorial, mailchimp
---

Congratulations! You've just downloaded your set of [responsive HTML email templates](http://htmlemail.io) and are ready to start sending professional looking emails from your ESP (Email Service Provider). Now you need to put them into Mailchimp so you can use them.

[Mailchimp](http://mailchimp.com) is a great solution for an ESP and includes features for sending marketing campaigns, 3rd party integrations, marketing automation and a powerful developer API.

With Mailchimp you can either set your template as a reusable template, or if you just need to send a one off campaign you can easily copy the templates across.

### Prepare your files for Mailchimp as a zip file

Mailchimp supports importing templates via a zip file, which is very convenient for including the CSS and image assets. Unfortunately they only support importing one at a time.

Before we start, lets zip up the template(s) you want to use.

1. Select the files you want to zip, which should include:
  * Non-inlined HTML template e.g. `newsletter.html`
  * `main.css` stylesheet
  * `/img` directory
1. Compress or zip these files into one zip file
1. Rename the file so you know what it is

<figure class="blog--image">
  <img src="/img/mailchimp-zip.gif" alt="Zip your email files" width="300">
</figure>

That should be you good to go with your email template in one zip file.

### How to use custom email templates for a one off campaign

#### 1. Create a new campaign

* Open your Mailchimp dashboard
* Go to `Camgaigns` > `Create Campaign`
* Select the type of campaign to send e.g. `Regular Campaign`
* Choose the list you plan on sending it to
* Enter your campaign information 

#### 2. Upload your email template

When asked to select a template:

* Choose `Code your own` > `Import from zip`
* Select your zip file that includes the template
* Wait for it to upload

<figure class="blog--image">
  <img src="/img/mailchimp-upload.gif" alt="Upload your zip file" width="500">
</figure>

#### 3. Edit your template

Now you can replace the content with your content. Remember to do the following:

* Headings
* Body text
* Links
* Images
* Social links
* Preheader text
* Unsubscribe tag
* Address tag

Turn the inline CSS setting on so that your styles are automatically inlined before sending.

<figure class="blog--image">
  <img src="/img/mailchimp-inline.png" alt="Inline your CSS" width="300">
</figure>

Include Mailchimp's unsubscribe tag in your template. The tag is `*|UNSUB|*`. So your unsubscribe line in the footer should look something like:

```html
Don't like these emails? <a href="*|UNSUB|*">Unsubscribe</a>.
```

Mailchimp also requires you to include their address tag. To do this, replace the address in your footer with their tag `*|LIST:ADDRESSLINE|*`.

Depending on whether you're paying for Mailchimp's service or not, you may be required to include their rewards badge in your footer with their tag `<center>*|REWARDS|*</center>`.

Now test it. This step is VERY important.

<figure class="blog--image">
  <img src="/img/mailchimp-test.png" alt="Test your email" width="300">
</figure>

If all looks good you should be ready to send.

<figure class="blog--image">
  <img src="/img/mailchimp-sent.png" alt="Send your campaign" width="300">
</figure>

### How to make your templates reusable

* Open your Mailchimp dashboard
* Go to `Templates` > `Create Template`
* Repeat the steps above with regards to importing your template from a zip file, or you can paste in the code if you prefer
* Once your template is uploaded, use [Mailchimp tags](http://kb.mailchimp.com/templates/code/getting-started-with-mailchimps-template-language) to identify what parts of the template are editable

For example, if you want to make the whole of the body section editable, add `mc:edit="body"` to the HTML element.

```html
<table border="0" cellpadding="0" cellspacing="0" class="main" mc:edit="body">
This content is then editable by any one when using this template
</table>
```

Or if you want to be more granular about it and only let people edit certain lines of text:

```html
<tr>
  <td class="wrapper">
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <h1 class="align-center" mc:edit="heading-1">Across the Universe</h1>
          <p><img src="img/photo1.jpeg" alt="Helpful placeholder image text" width="520" class="img-responsive img-block" mc:edit="image-1"></p>
          <p mc:edit="description-1">Words are flowing out, like endless rain into a paper cup. They slither while they pass, they slip away across the universe.</p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

For more information on editable templates read Mailchimp's [Create Editable Content Areas with MailChimp’s Template Language](http://kb.mailchimp.com/templates/code/create-editable-content-areas-with-mailchimps-template-language)


### Further reading

* [Mailchimp: How to Import a Custom HTML Template](http://kb.mailchimp.com/templates/code/how-to-import-a-custom-html-template)
* [Getting Started with MailChimp’s Template Language](http://kb.mailchimp.com/templates/code/getting-started-with-mailchimps-template-language)


