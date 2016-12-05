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

# Contentful Integration
activate :contentful do |f|
  f.access_token = '595538fecbbc00253d9baf3defb922f09047601b17bab296fe8ef82d24592adf'
  f.space = { site: 'rvnl2qm3k12r' }
  f.cda_query = { limit: 1000 }
  f.all_entries = true
  f.content_types = {
    index_page: "index_page",
    categories: "product_category",
    subcategories: "subcategory", # Product subcategories
    products_a: "products", # Products with detail page
    products_b: "producto_simple", # Products without detail page
    product_applications: "product_application",
    stores: "store",
    jobs: "jobs",
    contact: "contact",
    ad_contact: "ad_contact",
    ad_newsletter: "ad_newsletter",
    ad_sales: "ad_sales",
    ad_sections: "ad_sections"
  }
end

###
# Proxies
###

# Product Categories
data.site.categories.each do |id, category|
  if category.name != "Ferretería"
    proxy "/#{ category.name.parameterize }/index.html", "/products/list.html", :locals => { :category => category, :subcategory => false }, :ignore => true
  else
    proxy "/#{ category.name.parameterize }/index.html", "/products/pending.html", :locals => { :category => category, :subcategory => false }, :ignore => true
  end
end

# Product Applications
data.site.product_applications.each do |id, application|
  proxy "/productos-por-aplicacion/#{ application.title.parameterize }/index.html", "/product-applications/detail.html", :locals => { :application => application }, :ignore => true
end

###
# Ignore Directories
###

# Product Application Templates
ignore '/product-applications'
