sed -i 's/})(function/    else if (typeof window != "undefined") factory(window.require||function(){}, window["\@servicestack\/react"]={});\n})(function/' dist/servicestack-react.umd.js
sed -i 's/require("react")/require("react") || window.React/' dist/servicestack-react.umd.js
sed -i 's/require("classnames")/require("classnames") || window.classNames/' dist/servicestack-react.umd.js
sed -i 's/require("\@servicestack\/client")/require("\@servicestack\/client") || window["\@servicestack\/client"]/' dist/servicestack-react.umd.js
sed -i 's/require("react-router-dom")/require("react-router-dom") || window.ReactRouterDOM/' dist/servicestack-react.umd.js
