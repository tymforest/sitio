module Functions
  # Phone: Transforms '(81) 8363 2324' -> '8183632324'
  def phone number
    phone_number = number.gsub(' ', '').gsub('(', '').gsub(')', '')
  end
  # Enhorar: Transforma '8' a '8:00' y '18.25' a '6:15'
  def time number
    itIs = []
    time = "Cómprate un reloj!"
    hour = number.floor
    minutes = number - hour
    type = "am"
    if hour > 12
      hour -= 12
      type = "pm"
    end
    time = "#{hour}:"
    minutes *= 60
    if (minutes.floor) == 0
      time += "00"
    elsif 0 < minutes && minutes < 10
      time += "0#{minutes}"
    else
      time += "#{minutes.floor}"
    end
    itIs.push(time, type)
  end
  # Schedule Wrapper
  def package_schedule store
    schedules = []
    weekdays = []
    saturdays = []
    data.site.stores.each do |id, s|
      if s.name === store
        schedule = s.schedule
        if !schedule.weekday_lunch && !schedule.weekday_afternoon
          block = []
          block.push(schedule.weekday_open)
          block.push(schedule.weekday_close)
          weekdays.push(block)
        elsif schedule.weekday_lunch && schedule.weekday_afternoon
          block = []
          block.push(schedule.weekday_open)
          block.push(schedule.weekday_lunch)
          weekdays.push(block)
          block = []
          block.push(schedule.weekday_afternoon)
          block.push(schedule.weekday_close)
          weekdays.push(block)
        end
        block = []
        block.push(schedule.saturday_open)
        block.push(schedule.saturday_close)
        saturdays.push(block)
        schedules.push(weekdays)
        schedules.push(saturdays)
      end
    end
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
  # Fetch State Object by Store Name
  def fetch_state store_name
    state = ""
    state_name = ""
    data.site.stores.each do |id, store|
      if store.name === store_name
        state_name = store.address.estado.nombre
      end
    end
    data.site.estados.each do |id, estado|
      if estado.nombre === state_name
        state = estado
      end
    end
    state
  end
  # Fetch Job Object by Job Title
  def fetch_job_state job_title
    state = ""
    state_name = ""
    data.site.jobs.each do |id, job|
      if job.title === job_title
        state_name = job.location.address.estado.nombre
      end
    end
    data.site.estados.each do |id, estado|
      if estado.nombre === state_name
        state = estado
      end
    end
    state
  end
  # Fetch measurement on sale by ID
  def fetch_measurement_on_sale measurement_id
    measurement = ""
    data.site.measurements_on_sale.each do |id, sale|
      if sale.id === measurement_id
        measurement = sale
        break
      end
    end
    measurement
  end
end
