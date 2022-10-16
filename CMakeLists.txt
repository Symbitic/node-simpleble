# SPDX-FileCopyrightText: 2022 Alex Shaw <alex.shaw.as@gmail.com>
#
# SPDX-License-Identifier: MIT

cmake_minimum_required(VERSION 3.16)

project(simpleble)

option(ENABLE_NODE "Build Node.js bindings" ON)
option(ENABLE_FFI "Build FFI bindings" ON)

if (APPLE)
  set(CMAKE_OSX_ARCHITECTURES "x86_64;arm64" CACHE STRING "macOS architecture" FORCE)
  set(CMAKE_OSX_DEPLOYMENT_TARGET "10.15" CACHE STRING "macOS target" FORCE)
elseif(WIN32)
  set(CMAKE_SYSTEM_VERSION "10.0.22000.0" CACHE STRING "Windows version" FORCE)
endif()

add_subdirectory(SimpleBLE/simpleble)

if (ENABLE_NODE)
  add_library(simpleble-node SHARED
    lib/adapter.h
    lib/adapter.cpp
    lib/bindings.cpp
    lib/peripheral.h
    lib/peripheral.cpp
    ${CMAKE_JS_SRC}
  )
  target_include_directories(simpleble-node PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/lib
    ${CMAKE_JS_INC}
  )
  target_link_libraries(simpleble-node PRIVATE
    simpleble-c
    ${CMAKE_JS_LIB}
  )
  target_compile_definitions(simpleble-node PRIVATE
    NAPI_VERSION=7
    #NDEBUG
    #NAPI_EXPERIMENTAL
    #NAPI_DISABLE_CPP_EXCEPTIONS
  )
  set_target_properties(simpleble-node PROPERTIES
    OUTPUT_NAME "simpleble"
    CXX_STANDARD 17
    PREFIX ""
    SUFFIX ".node"
  )
  if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
    execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
  endif()
endif()

if (ENABLE_FFI)
  add_library(simpleble-wrapper SHARED lib/wrapper.cpp)
  target_link_libraries(simpleble-wrapper PRIVATE simpleble-c)
  set_target_properties(simpleble-wrapper PROPERTIES
    OUTPUT_NAME "simpleble"
    CXX_STANDARD 17
    CXX_VISIBILITY_PRESET hidden
    VISIBILITY_INLINES_HIDDEN YES
    POSITION_INDEPENDENT_CODE ON
    WINDOWS_EXPORT_ALL_SYMBOLS ON
  )
endif()