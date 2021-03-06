# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "https://ssrubin.com"

			root: ""

			# Here are some old site urls that you would like to redirect from
			oldUrls: [
				'http://www.cs.berkeley.edu/~srubin/',
				'http://eecs.berkeley.edu/~srubin/'
			]

			# The default title of our website
			title: "Steve Rubin"

			# The website description (for SEO)
			description: """
				Personal website of Steve Rubin, software engineer and CS PhD.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				steve, rubin, steve rubin, berkeley, eecs, uc berkeley, cs, computer science, hci, music, detour, engineering, tech
				"""

			# The website author's name
			author: "Steve Rubin"

			# The website author's email
			email: "srubin@cs.berkeley.edu"

			services:
				disqus: 'ssrubin'

		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')

		formatDate: (d) ->
			day = d.getDate()
			month = d.getMonth() + 1
			year = d.getFullYear()
			"#{month}/#{day}/#{year}"


	environments:
		deploy:
			templateData:
				site:
					root: "//ssrubin.com"

		development:
			templateData:
				site:
					root: ""
					services:
						serviceToDisable: false

	# =================================
	# Collections

	collections:
		posts: (database) ->
			database.findAllLive({relativeOutDirPath: $startsWith: 'posts'}, [date:-1])

		pubs: (database) ->
			query =
				relativeOutDirPath: $startsWith: 'publications'

			sorting =
				date: -1

			database.findAllLive(query, sorting).on "add", (pub) ->
                pub.setMeta(
                    write: false
                )



	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}

# Export our DocPad Configuration
module.exports = docpadConfig