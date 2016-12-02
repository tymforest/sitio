module Functions
  # Phone: Transforms '(81) 8363 2324' -> '8183632324'
  def phone number
    phone_number = number.gsub(' ', '').gsub('(', '').gsub(')', '')
  end
  # Schedule Wrapper
  def wrap store
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
      schedules.push(weekdays)
      schedules.push(saturdays)
      schedules
    end
  end
end
