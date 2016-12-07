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

###
# Contentful configuration
###

# Contentful Integration
activate :contentful do |f|
  f.access_token = '595538fecbbc00253d9baf3defb922f09047601b17bab296fe8ef82d24592adf'
  f.space = { site: 'rvnl2qm3k12r' }
  f.cda_query = { include: 10 }
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
    ad_sections: "ad_sections",
    ad_banner: "ad_banner",
    service_subcategory: "service_subcategory",
    sale: "sale",
    service_page: "service_section",
    services: "service",
    consulting_section: "consulting_section",
    shipping_section: "shipping_section",
    stores_page: "stores_page",
    about_page: "about",
    jobs_page: "careers",
    policy_page: "policy",
    error_page: "error"
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

# Product Subcategories
data.site.subcategories.each do |id, subcategory|
  if subcategory.category.name != "Ferretería"
    if subcategory.is_detail
      proxy "/#{ subcategory.category.name.parameterize }/#{ subcategory.nombre.parameterize }/index.html", "/products/list.html", :locals => { :category => subcategory.category, :subcategory => subcategory }, :ignore => true
    else
      proxy "/#{ subcategory.category.name.parameterize }/#{ subcategory.nombre.parameterize }/index.html", "/products/subcategory-detail.html", :locals => { :category => subcategory.category, :subcategory => subcategory, :product => false }, :ignore => true
    end
  end
end

# Products
data.site.products_a.each do |id, product|
  if !product.subcategory
    proxy "/#{ product.category.name.parameterize }/#{ product.name.parameterize }/index.html", "/products/product-detail.html", :locals => { :category => product.category, :subcategory => false, :product => product }, :ignore => true
  else
    proxy "/#{ product.category.name.parameterize }/#{ product.subcategory.nombre.parameterize }/#{ product.name.parameterize }/index.html", "/products/product-detail.html", :locals => { :category => product.category, :subcategory => product.subcategory, :product => product }, :ignore => true
  end
end

# Products on Sale
$products_on_sale = 0
data.site.products_a.each do |id, product|
  if product.is_sale
    $products_on_sale += 1
  end
end
data.site.products_b.each do |id, product|
  if product.is_sale
    $products_on_sale += 1
  end
end

if $products_on_sale > 0
  ignore "/ofertas/index.html"
end

# Product Applications
data.site.product_applications.each do |id, application|
  proxy "/productos-por-aplicacion/#{ application.title.parameterize }/index.html", "/product-applications/detail.html", :locals => { :application => application }, :ignore => true
end

# Stores
data.site.stores.each do |id, store|
  if !store.is_base
    proxy "/sucursales/#{ store.name.parameterize }/index.html",  "/sucursales/detail.html", :locals => { :store => store }, :ignore => true
  end
end

# Careers
$jobs = 0
data.site.jobs.each do |id, job|
  if job.is_published
    $jobs += 1
  end
end

if $jobs > 0
  data.site.jobs.each do |id, job|
    proxy "/empleos/#{ job.location.name.parameterize }/#{ job.title.parameterize }/index.html", "/empleos/detail.html", :locals => { :job => job }, :ignore => true
  end
else
  ignore '/empleos/detail.html'
end

###
# Ignore Directories
###

# Product Application Templates
ignore '/product-applications'
