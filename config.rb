###
# General configuration
###

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Page configuration
###

# Layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

###
# Contentful configuration
###
activate :contentful do |f|
  f.access_token = '595538fecbbc00253d9baf3defb922f09047601b17bab296fe8ef82d24592adf'
  f.space = { content: 'rvnl2qm3k12r' }
  f.content_types = {
    gallery: 'gallery'
  }
end
