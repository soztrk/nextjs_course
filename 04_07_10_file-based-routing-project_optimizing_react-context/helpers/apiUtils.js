export const getAllEvents = async () => {
    try{
        const response = await fetch("https://react-http-52c30-default-rtdb.europe-west1.firebasedatabase.app/events.json")

        if(!response.ok){
            throw new Error("Request failed!")
          }

        const data = await response.json()

        const events = []

        for(const key in data){
            events.push({
                id:key,
                ...data[key]
            })
        }

        return events

    } catch(error){
        console.log(error)
    }
}

export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents()
    return allEvents.filter(event=>event.isFeatured)
}

export const getEventById = async (id) => {
    const allEvents = await getAllEvents()
    return allEvents.find(event=>event.id===id)
}

export const getFilteredEvents = async (dateFilter) => {
    const allEvents = await getAllEvents()

    const { year, month } = dateFilter;
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
}

