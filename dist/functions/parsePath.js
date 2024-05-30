export default function parsePath(path) {
    return path.split('/').filter(Boolean);
}
