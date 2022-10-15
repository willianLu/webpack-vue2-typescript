const requireContext = require.context("./svg", false, /\.svg$/);
requireContext.keys().map(requireContext);
