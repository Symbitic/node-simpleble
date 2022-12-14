cmake_minimum_required(VERSION 3.16)

project(simpleble-node-wrapper)

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
  execute_process(COMMAND node -p "require('node-addon-api').include_dir"
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    OUTPUT_VARIABLE NODE_ADDON_API_DIR
    OUTPUT_STRIP_TRAILING_WHITESPACE
  )
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
    ${NODE_ADDON_API_DIR}
  )
  target_link_libraries(simpleble-node PRIVATE simpleble-c ${CMAKE_JS_LIB})
  target_compile_definitions(simpleble-node PRIVATE NAPI_VERSION=7)
  set_target_properties(simpleble-node PROPERTIES
    OUTPUT_NAME "simpleble"
    CXX_STANDARD 17
    PREFIX ""
    SUFFIX ".node"
  )

  if (MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
    # Generate node.lib
    execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
  endif()
endif()

if (ENABLE_FFI)
  if(UNIX AND NOT APPLE)
    string(TOLOWER ${CMAKE_SYSTEM_PROCESSOR} arch)
    if(arch STREQUAL "amd64")
      set(arch "x86_64")
    endif()
    set(suffix ".${arch}")
  endif()
  add_library(simpleble-wrapper SHARED lib/wrapper.cpp)
  target_link_libraries(simpleble-wrapper PRIVATE simpleble-c)
  set_target_properties(simpleble-wrapper PROPERTIES
    OUTPUT_NAME "simpleble${suffix}"
    CXX_STANDARD 17
    CXX_VISIBILITY_PRESET hidden
    VISIBILITY_INLINES_HIDDEN YES
    POSITION_INDEPENDENT_CODE ON
    WINDOWS_EXPORT_ALL_SYMBOLS ON
  )
endif()
