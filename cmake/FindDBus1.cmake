message("FOUND DBUS")

set(DBus1_LIBRARY "/usr/lib/x86_64-linux-gnu/libdbus-1.so" CACHE STRING "DBus library")
set(DBus1_LIBRARIES "${DBus1_LIBRARY}" CACHE STRING "DBus libraries")
set(DBus1_INCLUDE_DIR "/usr/include/dbus-1.0" CACHE STRING "DBus include dir")
set(DBus1_ARCH_INCLUDE_DIR "/usr/lib/${CMAKE_SYSTEM_PROCESSOR}-linux-gnu/dbus-1.0/include" CACHE STRING "DBus arch include dir")

add_library(dbus-1 SHARED IMPORTED)
set_property(TARGET dbus-1 PROPERTY IMPORTED_LOCATION ${DBus1_LIBRARY})
set_property(TARGET dbus-1 PROPERTY INTERFACE_INCLUDE_DIRECTORIES ${DBus1_INCLUDE_DIRS})
set_property(TARGET dbus-1 PROPERTY INTERFACE_COMPILE_DEFINITIONS ${DBus1_DEFINITIONS})
