const tempFilter = (data, ids) => {
  return data.filter(function(item) {
    return ids.indexOf(item.parentId) > -1;
  });
};
export const getDepth = data => {
  let depth = 0,
    nodes = data.filter(function(item) {
      return item.parentId === 0;
    }),
    total = nodes.length;

  do {
    depth++;
    let ids = nodes.map(function(item) {
      return item["id"];
    });
    nodes = tempFilter(data, ids);
    total += nodes.length;
  } while (nodes.length > 0 && total <= data.length);
  return depth;
};
export const getChildRows = (row, rows) => {
  const childRows = rows.filter(r => r.parentId === (row ? row.id : 0));
  return childRows.length ? childRows : null;
};
export const customFilter = (rows, element) => {
  return rows.filter(
    item =>
      item.parentId === element.parentId &&
      item.description.trim() === element.description.trim()
  );
};
