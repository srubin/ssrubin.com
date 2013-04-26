---
title: "A web-first research methodology"
layout: "post"
date: "4/25/2013"
---

When I started grad school in the Fall of 2011, I didn't consider
myself to be an excellent programmer or a [hacker][hn] or anything
like that. On the other hand, I did consider myself to be an
exceptional googler and [tinkerer][tinker]; I could usually scrounge
up a solution to my current programming problem without much
difficulty.

My first research project in grad school involved a javascript-heavy
experiment that we were going to deploy to Mechanical Turk. I had done
my fair share of tinkering with client-side (HTML/CSS) and server-side
(Rails) web development, but I had always avoided javascript. No, I
don't know why.

Eager to show my collaborators that I was capable of writing code that
worked and writing it quickly, I dove into javascript's prototypical
deep end. My code, hideous as it was, worked fine and allowed for
rapid iteration.

Just to expand on the aforementioned hideousness, we're talking a
whole mess of global variables and inline HTML:

```javascript
$('body').prepend('<span id="codespan"><strong>Enter your code: </strong><input style="display: inline" id="turkcode" type="text" name="turkcode"></input><button id="codebutton">Submit</button></span>');
```

Oh dear.

My intention isn't to call out how bad I was at javascript a year and
half ago. I was inspired by the process. That project necessitated
that I build a web app, but my projects since then have been more
flexible. But all of my (and your, I'm guessing) research
collaborators have a somewhat unbelievable number of devices that can
access the web, so ideally, my research should live on the web instead
of in some C++ or Java code that may not ever be compiled on anyone
else's machine.

This idea of web-first research manifests itself it a number of ways:

* Whenever I'm building an interface, I will try to make it a web app
  as opposed to a native GUI.
  * Remote collaborators can see what I'm working on without
    downloading and compiling code, getting the proper libraries
    installed, debugging platform-specific issues, and so on.
  * Everyone wants scientists to release their code. Once published,
    web-based projects are easy to disseminate because they're already
    running in-browser.
* For each project, I maintain a private website to track progress,
  results, and ideas. If someone misses a meeting, they can just check
  the site to see what's going on.
* I like learning new programming languages and frameworks. The web is
  constantly evolving, so I have the opportunity to learn and extend
  tons of cool web-related technologies and tools. So far in grad
  school: [web.py][webpy], [flask][flask], [django][django],
  [node.js][node], [SQLAlchemy][sqla], [dojo][dojo], [jQuery][jq],
  [jQuery UI][jqui], [underscore][underscore], [coffeescript][cs],
  [docpad][dp] and many more. Being able to learn these tools while
  I'm doing my research is a highly-motivational mixture of work and
  play.
* Rapid iteration for the web is, well, rapid. This applies to high-
  level languages in general. Sure, algorithms are going to run a bit
  slower, but only invest the time in highly optimized implementations
  if your research depends on it.

Web-first research doesn't make sense for all areas of research, but I
encourage other graduate students (HCI and otherwise) to think about
these things as they're working on projects.

[hn]: http://news.ycombinator.com
[tinker]: http://hci.stanford.edu/research/opportunistic/
[webpy]: http://webpy.org/
[flask]: http://flask.pocoo.org/
[django]: https://www.djangoproject.com/
[node]: http://nodejs.org/
[sqla]: http://www.sqlalchemy.org/
[dojo]: http://dojotoolkit.org/
[jq]: http://jquery.com/
[jqui]: http://jqueryui.com/
[underscore]: http://underscorejs.org/
[cs]: http://coffeescript.org/
[dp]: http://docpad.org
