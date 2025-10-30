export default function generateRefId(prefix = "BK") {
  const t = Date.now().toString(36).toUpperCase(); // time based
  const r = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${t}-${r}`;
}
