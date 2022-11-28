if(CMAKE_GENERATOR MATCHES "Visual Studio")
  message(FATAL_ERROR "Visual Studio generator not supported, use: cmake -G Ninja")
endif()
set(CMAKE_SYSTEM_NAME "Linux")
set(CMAKE_SYSTEM_VERSION 1)
set(CMAKE_SYSTEM_PROCESSOR "arm")
set(CMAKE_C_COMPILER "zig" cc -target arm-linux-gnueabihf)
set(CMAKE_CXX_COMPILER "zig" c++ -target arm-linux-gnueabihf)

if(WIN32)
  set(SCRIPT_SUFFIX ".cmd")
else()
  set(SCRIPT_SUFFIX ".sh")
endif()
set(CMAKE_AR "${CMAKE_CURRENT_LIST_DIR}/zig-ar${SCRIPT_SUFFIX}")
set(CMAKE_RANLIB "${CMAKE_CURRENT_LIST_DIR}/zig-ranlib${SCRIPT_SUFFIX}")

set(CMAKE_FIND_ROOT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64")
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)

# DBus
set(DBus1_ROOT "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64" CACHE STRING "Root")
set(DBus1_LIBRARY "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/libdbus-1.a"
  CACHE STRING "DBus library")
set(DBus1_LIBRARIES
  "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/libdbus-1.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/liblzma.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/liblz4.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/libgpg-error.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/lib/libgcrypt.a"
  CACHE STRING "DBus libraries")
set(DBus1_INCLUDE_DIRS "${CMAKE_CURRENT_SOURCE_DIR}/temp/arm64/include/dbus-1.0"
  CACHE STRING "DBus include dirs")
set(DBus1_FOUND TRUE CACHE BOOL "DBus found")

set(CMAKE_C_FLAGS "-pthread -Wl,-Bsymbolic -I${DBus1_INCLUDE_DIRS}" CACHE STRING "Compiler Flags")
set(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS}" CACHE STRING "Compiler Flags")
set(CMAKE_SHARED_LINKER_FLAGS "-Wl,-Bsymbolic" CACHE STRING "Link flags")
