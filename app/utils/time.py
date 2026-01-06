from datetime import datetime, timedelta

def add_minutes(time_str: str, minutes: int) -> str:
    """
    Add minutes to a HH:MM time string.
    """
    base_time = datetime.strptime(time_str, "%H:%M")
    updated = base_time + timedelta(minutes=minutes)
    return updated.strftime("%H:%M")


def estimate_activity_block(start_time: str, duration_minutes: int) -> dict:
    """
    Create a time block for an activity.
    """
    end_time = add_minutes(start_time, duration_minutes)
    return {
        "start": start_time,
        "end": end_time,
        "duration_min": duration_minutes
    }


def default_day_start() -> str:
    """
    Standard day start time for itineraries.
    """
    return "09:00"


def default_day_end() -> str:
    """
    Standard day end time for itineraries.
    """
    return "21:00"
