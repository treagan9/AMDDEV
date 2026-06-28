// src/admin/lib/usePageContent.jsx
import { useState, useEffect } from 'react';
import supabase from './supabase.jsx';

var contentCache = {};

function usePageContent(page, section, defaults) {
  var cacheKey = page + ':' + section;
  var [content, setContent] = useState(contentCache[cacheKey] || defaults || {});
  var [loaded, setLoaded] = useState(!!contentCache[cacheKey]);

  useEffect(function () {
    if (contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      setLoaded(true);
      return;
    }
    supabase.from('page_content').select('content').eq('page', page).eq('section', section).single().then(function (result) {
      if (result.data && result.data.content) {
        var merged = Object.assign({}, defaults || {}, result.data.content);
        contentCache[cacheKey] = merged;
        setContent(merged);
      }
      setLoaded(true);
    });
  }, [page, section]);

  return content;
}

export default usePageContent;
