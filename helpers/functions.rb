module Functions
  # Phone: Transforms '(81) 8363 2324' -> '8183632324'
  def phone number
    phone_number = number.gsub(' ', '').gsub('(', '').gsub(')', '')
  end
  # Schedule Wrapper
  def package_schedule store
    schedules = []
    weekdays = []
    saturdays = []
    data.site.stores.each do |id, s|
      if s.name === store
        sc = s.schedule
        if !sc.weekday_lunch && !sc.weekday_afternoon
          block = []
          block.push(sc.weekday_open)
          block.push(sc.weekday_close)
          weekdays.push(block)
        else
          block = []
          block.push(sc.weekday_open)
          block.push(sc.weekday_lunch)
          weekdays.push(block)
          block = []
          block.push(sc.weekday_afternoon)
          block.push(sc.weekday_close)
        end
        block = []
        block.push(sc.saturday_open)
        block.push(sc.saturday_close)
        saturdays.push(block)
      end
    end
    schedules.push(weekdays)
    schedules.push(saturdays)
    schedules
  end
  # Subcategory on Sale Checker
  def subcategory_on_sale name
    on_sale = false
    data.site.products_b.each do |id, product|
      if product.subcategory.nombre === name
        if product.is_sale
          on_sale = true
          break
        end
      end
    end
    on_sale
  end
  # Products on Sale Checker
  def check_sales
    sale = false
    data.site.products_a.each do |id, product|
      if product.is_sale
        sale = true
        break
      end
    end
    if sale === false
      data.site.products_b.each do |id, product|
        if product.is_sale
          sale = true
          break
        end
      end
    end
    sale
  end
  # Fetch Product Category by ID
  def fetch_category category_id
    category = ""
    data.site.categories.each do |id, c|
      if category_id == c.id
        category = c
        break
      end
    end
    category
  end
  # Fetch Product Subcategory by ID
  def fetch_subcategory subcategory_id
    subcategory = ""
    data.site.subcategories.each do |id, sc|
      if subcategory_id === sc.id
        subcategory = sc
        break
      end
    end
    subcategory
  end
  # Fetch Service Subcategory by ID
  def fetch_service_subcategory subcategory_id
    subcategory = ""
    data.site.service_subcategory.each do |id, subc|
      if subc.id === subcategory_id
        subcategory = subc.nombre
        break
      end
    end
    subcategory
  end
end
