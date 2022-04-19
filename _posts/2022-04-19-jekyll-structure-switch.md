---
layout: post
title: Switching to templates and utilizing jekyll!
description: My journey of re-organization and re-structuring of my site from plain and manually written HTML to automated, template-bound and Markdown-written pages!
meta_tags: jekyll,github,pages,switching,html,markdown,templates,layouts,atom,rss,feed
revdate: 2022-04-19
category: tech
tags: [blog]
---
{:.no_toc}
# {{ page.title }}
<hr>

Recently I switched from having plain HTML and manual, hand-made organization of my site on the backbone of it to markdown-centric and template-bound one with utilization of jekyll's features! This has been a thorough process of getting everything converted, learning new things and whatnot, but I got there in the end. If you are reading this post, then at this point my site now runs on a new file structure and has been massively re-organized. This post documents my journey, starting from a plain, manually written html site to automating and utilizing jekyll features to the fullest extent!... Or, well, at least to the extent possible and where required.

# Motivation
It's a really simple story, really. One wonderful day I decided to get myself an Atom/RSS feed! To my relief Github offers your pages a few plugins which you can enable by creating / modifying your `_config.yml`... Which I actually didn't have at the time, and I created it with defining a plugin array to include jekyll-feed, the Atom/RSS feed for jekyll plugin. Good news? There is a feed now! I could access it by going to [/feed.xml](/feed.xml) in the root level directory.

...that was the good news. The bad news? My site / blog had to adhere to a specific file structure for jekyll-feed to recognize posts and put them onto the feed. That was... a bit rough hitting for me since the previous structure worked fine for my cases! Or so I thought at the time. 

Of course after poking around for a while, I decided I quite literally have no other options but to re-organize my site's file structure.

When I started the conversion, my-then-current but now previous file structure looked something like this: (with blog listing as an example)

```
├── blog
│   ├── entries
│   │   ├── entryName1.html
│   │   ├── entryName2.html
│   │   ├── entryName3.html
│   │   ├── entryName4.html
│   │   └── index.html
│   └── index.html
```

So there is a <abbr title="Subdirectory">subdir</abbr> for blog, subdir for entries and files within the "entries" subdir are blog posts themselves. Sounds good and organized, right?... Well maybe not, but it was better than just having like, I don't know, everything in the root directory of the site! So relatively it was *kind of* organized right?

Jekyll's structure is different. Each blog entry should be stored within `_posts` subdir. That way Jekyll knows what is a blog entry and what is a standard page. Each post should follow a strict format of being named like `YYYY-MM-DD-title.ext`. I would guess that jekyll-feed works on those basis, hence why it didn't work in my old structure. For each post in `_posts` subdir it generates a feed entry and disregards other pages, because jekyll-feed assumes that the other pages are irrelevant and are not blog posts. If it did generate feed for pages outside of `_posts` subdir, you'd have X amount of feed entries in your aggregator that aren't related to the blog posts, which you probably do not care about.

Doing that of course would require me to switch to a completely different format of storing files in my site, and a format that I haven't even used before. I'm a bit iffy when it comes to converting to something new - as that would mean learning the new structure which I don't know if it will even benefit me in the long run more or not...

So the thinking began. I was contemplating doing the reorganization for a day or so, thinking whether its worth it or not (it is), how much time will I have to spend re-doing everything (not that much)... Turns out it was **very** well worth it! Though reorganization took a few hours to figure out and do. Out of benefits so far, now I no longer have to manually define header or footers, or write in plain HTML! I just have to fill in the metadata at the top and fill in the body with content in a simple markdown! 

At *THAT* point I asked myself the following: "Why haven't I done that before???" No, seriously! What kind of an idiot I am to miss out on this?

Well... What's done is done. Not like it should stop me from converting my site to a better format anyway!

# The conversion
## Blog

First thing I got to converting is my blog entries to jekyll-like format. I needed to move all of them to `_posts` folder and give them a date prefix marking the publication date. That wasn't too difficult, and in the end it looked like this:

```
├── blog
│   ├── entries
│   │   └── index.html
│   └── index.html
├── _posts
│   ├── date-entryName1.html
│   ├── date-entryName2.html
│   ├── date-entryName3.html
│   └── date-entryName4.html
```

Posts are now stored under `_posts`! You may be wondering what `index.html` still is under the entries and blog subdirs. The one under entries is just a redirect back to /blog directory, and the one under blog is an entry index. Those did not need to be moved or converted and could remain in their place. Though I would still convert them to use jekyll at a later point...

If you had experience using jekyll prior, you might know how jekyll stores the posts by default. That... Didn't exactly suit me at the time, and I *initially* decided to change the way permalinks work, since now they're in a `/Category/YYYY/MM/DD/Title.html` format, which at that point I thought was 'bulky' and not exactly appeasing... Little did I know about what I would do later... So I added the following line to my `_config.yml` file:

```yml
permalink: /blog/entries/:title:output_ext
```

This line would change the blog post structure from the standard jekyll structure to my permalink structure. If you are observant enough, you will notice that the current permalink for this, and other older posts is actually different than what I defined above, and you might've already guessed what I did later... But more on that soon...

That was not all. Granted, the files are now converted to a new structure and format, sure, but they were still lacking 2 crucial things that jekyll expects you to have: layouts and front matter. 

- Layouts are basically page templates where I could fill what I will be re-using a lot, and make files *solely* have content in them. Layouts must be HTML. 

- Front matter is metadata you fill in at the top of the page for jekyll to sort through, which helps it identify what each page is and what to do with it based on front matter in there.

I thought "Great!" since the layouts will leave the headaches of filling the head portion of pages to jekyll, which will automate everything for me! Front matter was even better, since I did not need to fill in the head tags with proper information manually, and would just need to leave necessary info at the top of the page for jekyll to handle and fill into the head portion when it loads a layout!

Layouts are stored in the `_layouts` folder and are defined on a page-by-page basis by adding `layout: layoutName` into the page's front matter. I started with most crucial one: blog posts, since that is the one that is used the most, and arguably it's the biggest one.

I added the *huge* header into the layout file of the posts, which is basically a bunch of metadata for embeds like you'd get on Matrix, Slack or Discord. Good thing is that layouts can utilize jekyll's scripting goodies (and that's what they were intended for anyway, I would think). Which means that metadata that you would put in the front matter would automatically be filled within the head portion or wherever you usually would've put it in manually. In my case it goes something like this:

{% raw %}
```html
<head>
	<meta charset="utf-8">
	<meta property="og:title" content="{{ page.title }}">
	<meta property="og:site_name" content="{{ site.title }}">
	<meta property="og:url" content="https://redsql.github.io/blog">
	<meta property="og:description" content="{{ page.description }}">
	<meta property="og:type" content="article">
	<meta property="article:tag" content="{{ page.meta_tags }}">
	<meta property="keywords" content="{{ page.meta_tags }}">
	<link rel="stylesheet" href="/res/monokai.css">
	<link rel="stylesheet" href="/res/style.css"/>
	<link rel="alternate" type="application/atom+xml" title="{{ site.title }}" href="/feed.xml">
	<title>{{ page.title }}</title>
</head>
```
{% endraw %}

Keep in mind that since all this metadata that you see in double curly brackets is based on the front matter you provide, jekyll cannot figure it out by itself! This is something you have to manually fill in for every page. In terms of front matter data, I had to fill in every page with the following:

- Layout

	This isn't required for filling the metadata in. However it is required for jekyll to know what type of layout the page should utilize! In case of blog posts, like this one, the layout is `post`.

- Title 

	Self explanatory - the title of each blog post.

- Description 

	Short description of a blog post to summarize it in roughly 2-3 sentences.

- Meta tags 

	Custom variable. This fills in the tags within the `article:tag` and `keywords` properties. Usually you would fill in the standard tags for the page in there, but in my case I decided to use standard tags as a sorting and flagging mechanism for posts and separated the meta tags into a different variable.

- Revision date 

	Another custom variable. This defines the date of last time I revised an article. You may have noticed that the bottom of every blog post I have, I also have a "Last revised" date to show when was the last time I took a peek inside the post and made some sort of amendments to it. The date could be stored in any format I desire but I personally prefer it to be something like [ISO8601](https://wikiless.org/wiki/ISO_8601?lang=en) minus the time and timezone part.

- Category 

	The category under which the post would fall into. This can be anything, but at the moment most common ones are `tech`, `review` and `opinion`.

- Standard tags 

	The standard tags that are *not* related to the Meta tags. Those tags allow me to filter blog posts easily, and flag certain posts as either outdated or satirical.

- Replacement post 

	Optional variable. This should contain a link to the new blog post which replaces the current one. If set this will display a big warning at the top of the page that a replacement post is available. If not set then it will not display anything.

- Old page redirect from

	Optional variable. This is what I use for older blog posts that went through a conversion from old permalink format to a new one.


And then all the non-optional stuff gets filled within the head part! That concludes automation for the head portion of the post! Next up is body, which actually started out pretty simple as this:

{% raw %}
```html
<body>
	<a href="/blog">&#60;&#60;&#60;&#60; Index</a></li>
	{{ content }}
</body>
```
{% endraw %}

<sup id="authors-note">Author's note: the `&#60;` you see is actually supposed to be a `<`. HTML however does not like this, as less-than and more-than signs are reserved for denoting HTML elements. That symbol sequence just renders that character without opening a HTML element.</sup>

That was it, that's what it was for some time. But then discovered something... I learnt that jekyll can also have `_includes` folder, which is basically reusable HTML code, which can be embedded where needed and as needed! It's basically like defining a function and calling it later when it is required. Includes shouldn't be confused with layouts! Layouts is the base appearance of the page itself, where content gets filled in-between and something that jekyll automatically sorts when you fill the `layout` variable in the front matter. The `_includes` folder is on-demand HTML snippets that can be called for certain reasons, like marking a post outdated or giving a link to a new one.

With learning that, I got an idea! Since some of my blog posts are outdated and some are outdated + have a replacement for them, I could make a little reusable warning if I add an `outdated` tag to it! So I made a little warning to include, and amended the layout to this:

{% raw %}
```liquid
<body>
	<a href="/blog">&#60;&#60;&#60;&#60; Index</a></li>
	{% if page.tags contains "outdated" %}
		{% include post-outdated.html %}
		<hr>
	{% endif %}
	{{ content }}
</body>
```
{% endraw %}

Now if the post is tagged as outdated, the warning at the top will show that the post is... well, obviously outdated. Awesome!

Since I could tag posts as outdated and if I make major revamps to some of them to warrant a new blog entry, why not point those posts towards newer, better ones? This is where front matter and custom variables come in handy! 

In front matter you don't *only* have to fill in the required variables (technically all of them are optional) but you can make your own, too! This is how I got my "Replacement post" variable in. You simply add it in a format of YAML, like this: `key: value` and then you can refer to it by calling a page variable with jekyll like: {% raw %}`{{ page.key }}` {% endraw %} that! This seemed like a *perfect* spot to store a path to the newer post! So I defined a path to the new Cyberpunk review in my old one!

That is not good enough, though. There is nothing notifying the end user of the new post unless they see the blog index itself. Remember the `_includes` folder? That's where it comes handy again! You can call page variables in the included snippets, which makes it ideal for stuff like notifying the user of a newer version of the post, and providing a direct link to it! It was as simple as:

{% raw %}
```html
<h2>Newer / better entry for this topic is available!</h2>
	<p>See: <a href="{{ page.replaces }}">newer version here</a>!</p>
```
{% endraw %}

Now I had to see what I can do with blog entry index. Before converting my entire site into a new structure the blog entry index was written manually, by hand. However since now I adhere to jekyll's post structure, I could automate the entry index generation! After figuring out syntax a bit, I added the following lines to the entry index page:

{% raw %}
```liquid
{% for post in site.posts %}
<li><a href="{{ post.url }}">{{ post.title }}</a> (Published: <time datetime="{{ post.date | date: '%F' }}">{{ post.date | date: '%F' }}</time>)
{% endfor %}
```
{% endraw %}

This little jekyll/liquid script would loop for posts in all the posts that I made and make a link for them. Not only that, it will add a publication date that is defined within the file's name to it as well, like the old index. Though this *still* wasn't enough, as I wanted to account for cases when a post is outdated for example. Before automation I would just manually mark outdated posts as such, but how would you do that with scripting?

Remember tags? Now it's time for this feature to shine! With them you can mark a certain post with their own tags, and from there you can sort through them with those tags you assigned. It could be used for anything, like for marking outdated posts or sorting through them. Obviously the little script on entry index needed to be updated to account for that, so I amended the for loop and added logic for seeing if a post is tagged as outdated by doing this:

{% raw %}
```liquid
{% for post in site.posts %}
{% unless post.tags contains "outdated" %}
- <a href="{{ post.url }}">{{ post.title }}</a> (Published: <time datetime="{{ post.date | date: '%F' }}">{{ post.date | date: '%F' }}</time>)
{% endunless %}
{% endfor %}
```
{% endraw %}

Unless the post has "outdated" tag, it would go onto the index! And outdated entries could be listed by the same logic if we modify it a bit by replacing "unless" with "if", like this:

{% raw %}
```liquid
{% for post in site.posts %}
{% if post.tags contains "outdated" %}
- <a href="{{ post.url }}">{{ post.title }}</a> (Published: <time datetime="{{ post.date | date: '%F' }}">{{ post.date | date: '%F' }}</time>)
{% endif %}
{% endfor %}
```
{% endraw %}

That way I could place standard entry index in one place, and keep outdated entry index as a separate thing! This loop would output outdated entries into a separate place, just like I wanted! Awesome!

Though I had one small issue still - there is a satirical post which before automation was marked as such. Technically I could leave it as is and let people guess on their own whether I was serious or not. Sadly it's pretty much always better to be upfront about things like that, as not everyone understand satire the same way. 

How could I tag the posts as satire, though? Well... Good news for me! Remember the tags we used to mark outdated entries? Tags can be used for *anything*! We can add **ANY** tag we desire, and make scripts that sort through this tag and do what we want them to do with it! So marking satirical posts wasn't difficult at all, and was just a matter of adding the following statement in the loop logic:

{% raw %}
```liquid
{% if post.tags contains "satire" %}
{% endif %}
```
{% endraw %}

The loop will now loop over all site posts, sort through outdated and non outdated ones, write a publication date next to them *and* will now show whether a post is satirical or not for visibility!

## Markdown > HTML
Before I delve into something else I feel like I should point this out: All the blog posts I have made thus far up to this point have been written in pure HTML. I didn't bother with markdown files initially for whatever reason, even though jekyll supports them and encourages people to use those primarily. But since then I actually changed my mind about it! See this post you're currently reading? Yes, the paragraphs, headers, lists, and code snippets you are reading right now! They're all actually written in markdown starting from this point on!

Though I will only do this for the posts I make from this point on. I don't think I'll bother with converting old entries or main site pages into markdown because... Well, I already made them and written them in pure HTML. Sure, I can use something like [Pandoc](https://pandoc.org/) to convert old entries into markdown... But that will require me tuning Pandoc for some time to my liking, and I can't be bothered to do that. For example, by default Pandoc would newline after approximately 70~ characters. This isn't exactly what I would like since the editor I'm using has a word wrap. Though it could be useful in cases you use something like Vim.

### Why markdown?
Up until recently I actually completely forgot one very small caveat that makes markdown very flexible, fun and even superior to the plain HTML. Because in markdown, you can **actually embed HTML code** into it! Granted with a few caveats... But you can still embed HTML code! In fact, the current page is a mix of markdown and HTML code! See this [note for example](#authors-note)? It's HTML which is embedded in the markdown code of this post!

Hell, you can even convert old HTML code into markdown relatively easily! Just grab an old HTML file, do some trivial modifications to it, rename its extension to `.md` and (on jekyll at least) it will work just like a plain HTML file!

This alone makes writing in markdown *waaaaaay* superior than in plain HTML - since you get the best of both worlds. You get the hassle-free writing experience, and if needed you can shove some HTML code if necessary. Besides, jekyll works best on markdown!

So this is blog itself and entry index improved, automated and converted. But what now? Believe it or not my site isn't just a personal blog, it also includes pages outside of it! Shocking, I know!

## Main site
Main site portion conversion was actually mostly simple, straightforward and without any hiccups. Just remove some footer / header parts on some pages and create a new layout for them. That layout being just this:

{% raw %}
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="/res/style.css"/>
		<title>{{ page.title }}</title>
	</head>
	<body>
		{{ content }}
	</body>
</html>
```
{% endraw %}

Granted it's not as huge as the other pages, like blog posts, but honestly? I don't really see the need for meta tags here. Not right now, anyway. But if I will require them in the future I can always just amend the layout and fill in the front matter in every page with desired data!

You may notice that the footer is missing. I actually decided that I don't need it for main site pages, not for now anyway. But if I ever need it, it *still* wouldn't be a hassle as it would just require me amending the layout file! Jekyll really makes stuff like this easy, it's not even funny!

I also noticed one little limitation of jekyll while converting main pages - if you do not have front matter in your file then jekyll **won't let you use jekyll features** like calling site variables that you can define in your `_config.yml` file. It's not exactly the end of the world, since you can just add one variable like title to the front matter and enjoy jekyll features from there, but it had me scratching my head for a bit because of this!

<hr>

It wasn't an entirely smooth sailing, though. There actually have been quite a good amount of issues that came from this, unfortunately. Good news? There haven't been actually *that* many of them, and I have fixed or worked around most of them! 

# The issues
## Atom/RSS
The Atom/RSS feed was perfectly up and running after I pushed the changes that converted my site to use jekyll features. It rendered the posts I marked it to render, and it appeared in the RSS aggregators just fine. But it actually had a tiny issue that was seemingly unforeseen and I certainly did not anticipate...

The RSS subscription bot on Matrix didn't render the apostrophe (`'`) correctly! As it turns out, Github does not return `charset=UTF-8` in the Content-Type when you request the feed directly! It returns it for other pages just fine though for some reason, but not the feed itself. 

***WHY GITHUB, WHY???***

I tried a few things, namely adding `encoding: UTF-8` to the `_config.yml` file, thinking that Github Pages would be smart enough to recognize it and forcefully make it return UTF-8 as the charset in the Content-Type. Bad news? That unfortunately did not help.

Worse yet, Github Pages do not support modification of HTTP headers! This means that modifying Content-Type is impossible, and I cannot forcefully append it with `charset=UTF-8`. **Why, Github?**

Still, sort of good news: I actually settled on compromise and removed apostrophes from my site's name in the configuration! Granted it's a hacky workaround more than anything else, but it still says the same thing, you can still understand it! Albeit even if a bit more 'ugly'.

## Syntax highlight did not work out of the box

When starting to write this post I knew I would *require* syntax highlight for this. Yet again, thankfully jekyll supports that too without any issues... Or so would people say so.

Out of the box? Syntax highlight **did not work**. It won't highlight anything even if you try your hardest, throw your headset out of the window, break your keyboard and scream your lungs out at the monitor. Nope. Won't work at all.

Turns out the solution was actually quite simple. It just required me adding a custom css into my `res` folder with all the highlight styling. Not the end of the world but still, documentation could have been a bit *way* more clear on that...

## Permalink conversion
Finally, the last issue was... Actually my fault for the most part. Remember when I said that the old URL permalink style was good enough for me at the time? Key words "at the time". Because then I thought it was the better way to keep the URL structure going... But after a while of thinking I realized that was just stupid! Why? Case in point: I have made an updated article before, which actually used similar file names!

My first [Cyberpunk 2077 review](/blog/2021/03/06/cyberpunk2077-review.html) and [my revised one](/blog/2022/04/16/cyberpunk-review.html) have similar file names: `cyberpunk2077-review.html` and `cyberpunk-review.html` respectively. As you can see, I had to manually dodge this file clash from happening! Not good! How about preventing this from happening in the future? Sounds great! So the new permalink format I settled on is:

```yml
permalink: /blog/:year/:month/:day/:title:output_ext
```

Perfect, new format set and ready to go! You might have seen that I also omitted the "entries" folder, as well as ":category" from standard jekyll's structure. I thought it was redundant anyway so I omitted it. I also did not add ":category" to the permalinks since, at the current moment I think it's pretty much unnecessary.

However to the surprise of absolutely nobody on the planet and even the techno-necromancers from alpha centauri, it has broken a page (possibly more, I haven't checked) which has a redirect to another post! Fixing it was just as simple as replacing the old style redirect with a proper new one with the new permalink format.

You know what that means? That means old links are no longer valid. *Oops...* 

So for any of you 0 readers this would break the experience! Yet again, thanks to Dr. Jekyll and Mr. Github there is this plugin called "jekyll-redirect-from", which lets you specify redirects for certain pages.

After adding it to my config file, I set out to add a `redirect_from` variable to every blog post I have made prior! That was a chore for the most part, but at least it wasn't too difficult. Now here is hoping I don't change my mind again...

# In closing...
This was a fun journey of ups and downs. Generally I had good experience with this, even if at times it left me a bit confused. 

Who would've knew that I would go from being a stubborn plain HTML writer to somebody who adores jekyll automation and markdown? So far I enjoy the new structure and way of operating *way* more, and the features jekyll offers? Just the icing on the cake! Seriously, if any of you read this that is still a plain HTML writer, take something like jekyll for a spin. Seriously, this is **GREAT**!

All the code for the site is available on [this repository](https://github.com/RedSQL/redsql.github.io), as usual. Want to convert to using jekyll and markdown? Feel free to look around and shamelessly copy my bad practices! Or you can just look up other blog pages hosted on Github Pages and see their code structure and shameless copy them, whatever floats your boat!

Though one thing remains ceratin: Here is hoping I don't change my mind about permalink structure again...
