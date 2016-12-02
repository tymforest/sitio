###
# General configuration
###

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Directory Indexes
activate :directory_indexes

###
# Page configuration
###

# Layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/index.html', layout: 'index'

###
# Contentful configuration
###
activate :contentful do |f|
  f.access_token = '595538fecbbc00253d9baf3defb922f09047601b17bab296fe8ef82d24592adf'
  f.space = { site: 'rvnl2qm3k12r' }
  f.cda_query = { limit: 1000 }
  f.all_entries = true
  f.content_types = { index: "index_page", stores: "store", products_a: "products", products_b: "producto_simple" }
end
