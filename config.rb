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
  f.access_token = ENV['CONTENTFUL_API_KEY']
  f.space = { site: 'rvnl2qm3k12r' }
  f.cda_query = { include: 10 }
  f.rebuild_on_webhook = true
  f.all_entries = true
  f.content_types = {
    # Index
    index_page: "index_page",
    # Services
    service_page: "service_section",
    services: "service",
    service_subcategory: "service_subcategory",
    consulting_section: "consulting_section",
    shipping_section: "shipping_section",
    # Stores
    stores_page: "stores_page",
    stores: "store",
    estados: "estados",
    # Products
    categories: "product_category",
    subcategories: "subcategory",
    products_a: "products",
    products_b: "producto_simple",
    sale: "sale",
    product_menu: "menu_de_productos",
    measurements_on_sale: "measurements_on_sale",
    # Product Applications
    product_applications: "product_application",
    # Jobs
    jobs_page: "careers",
    jobs: "jobs",
    # Contact
    contact: "contact",
    # Banner Ads
    ad_contact: "ad_contact",
    ad_newsletter: "ad_newsletter",
    ad_sales: "ad_sales",
    ad_sections: "ad_sections",
    ad_banner: "ad_banner",
    banner_ads: "anuncios_de_barra",
    # About
    about_page: "about",
    # Privacy Policy
    policy_page: "policy",
    # Error
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

if $products_on_sale == 0
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
