### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\vercel.json
*Saved at: 7/1/2026, 9:38:29 PM*

**[ADDED]**
```
1     {
2       "rewrites": [
3         {
4           "source": "/(.*)",
5           "destination": "/index.html"
6         }
7       ]
8     }
```

---

### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\src\app.jsx
*Saved at: 7/1/2026, 9:38:05 PM*

**[REMOVED]**
```
(from line ~16)
import './App.css'

```
**[ADDED]**
```
16    import './app.css'
```

---

### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\src\app.jsx
*Saved at: 7/1/2026, 9:15:24 PM*

**[ADDED]**
```
11    import { aStar } from './data/aStar'
12    import { resolveDestinationFromPath } from './data/urlNavigation'
```
**[REMOVED]**
```
(from line ~20)
  const { loadData }  = useCampusStore()

```
**[ADDED]**
```
20      const {
21        loadData,
22        setNavOrigin,
23        setNavDestination,
24        setNavPath,
25        setControlMode,
26      } = useCampusStore()
```
**[ADDED]**
```
45    
46          const route = resolveDestinationFromPath(window.location.pathname, { buildings, navGraph })
47          if (route?.destinationNodeId) {
48            setNavOrigin(route.sourceNodeId)
49            setNavDestination(route.destinationNodeId)
50            const path = aStar(navGraph, route.sourceNodeId, route.destinationNodeId)
51            if (path.length > 0) {
52              setNavPath(path)
53              setControlMode('EXPLORE')
54            }
55          }
56    
```

---

### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\src\data\urlNavigation.js
*Saved at: 7/1/2026, 9:15:24 PM*

**[REMOVED]**
```
(from line ~15)
  const normalizedPath = cleanPath.toLowerCase()

```
**[ADDED]**
```
15      const normalizedPath = cleanPath.toLowerCase().replace(/[^a-z0-9]/g, '')
16      if (!normalizedPath) return null
```
**[REMOVED]**
```
(from line ~18)
  const matchingBuilding = buildings.find(building => {
    const name = (building.name || '').toLowerCase()
    const id = (building.id || '').toLowerCase()
    const marker = normalizedPath.replace(/[^a-z0-9]/g, '')

    return (
      name.includes(normalizedPath) ||
      id.includes(normalizedPath) ||
      id.replace(/[^a-z0-9]/g, '').includes(marker)
    )
  })


```
**[ADDED]**
```
18      const matchingBuilding = buildings.find(building => matchesBuildingPath(building, normalizedPath))
```
**[REMOVED]**
```
(from line ~21)
  const destinationNodeId = matchingBuilding.entryNodeId || null


```
**[REMOVED]**
```
(from line ~23)
    destinationNodeId,

```
**[ADDED]**
```
23        destinationNodeId: findDestinationNodeId(navGraph, matchingBuilding),
```
**[ADDED]**
```
28    function matchesBuildingPath(building, normalizedPath) {
29      if (!building) return false
30    
31      const name = (building.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')
32      const id = (building.id || '').toLowerCase().replace(/[^a-z0-9]/g, '')
33    
34      if (!normalizedPath) return false
35      if (name.includes(normalizedPath) || id.includes(normalizedPath)) return true
36    
37      const prefix = normalizedPath.match(/[a-z]+/)?.[0] || ''
38      if (!prefix) return false
39    
40      return name.startsWith(prefix) || id.startsWith(prefix) || name.includes(prefix) || id.includes(prefix)
41    }
42    
43    function findDestinationNodeId(navGraph, building) {
44      const byExactId = navGraph?.nodes?.find(node => node.id === building.entryNodeId)
45      if (byExactId) return byExactId.id
46    
47      const byBuildingId = navGraph?.nodes?.find(node => node.buildingId === building.id)
48      if (byBuildingId) return byBuildingId.id
49    
50      return building.entryNodeId || null
51    }
52    
```

---

### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\src\data\urlNavigation.js
*Saved at: 7/1/2026, 9:13:38 PM*

**[ADDED]**
```
1     export function resolveDestinationFromPath(pathname, { buildings = [], navGraph }) {
2       if (!pathname) return null
3     
4       const cleanPath = pathname
5         .split('?')[0]
6         .split('#')[0]
7         .replace(/^\/+/, '')
8         .trim()
9     
10      if (!cleanPath) return null
11    
12      const sourceNodeId = findMainGateNodeId(navGraph)
13      if (!sourceNodeId) return null
14    
15      const normalizedPath = cleanPath.toLowerCase()
16    
17      const matchingBuilding = buildings.find(building => {
18        const name = (building.name || '').toLowerCase()
19        const id = (building.id || '').toLowerCase()
20        const marker = normalizedPath.replace(/[^a-z0-9]/g, '')
21    
22        return (
23          name.includes(normalizedPath) ||
24          id.includes(normalizedPath) ||
25          id.replace(/[^a-z0-9]/g, '').includes(marker)
26        )
27      })
28    
29      if (!matchingBuilding) return null
30    
31      const destinationNodeId = matchingBuilding.entryNodeId || null
32    
33      return {
34        buildingId: matchingBuilding.id,
35        destinationNodeId,
36        sourceNodeId,
37      }
38    }
39    
40    function findMainGateNodeId(navGraph) {
41      if (!navGraph?.nodes?.length) return null
42    
43      const gateNode = navGraph.nodes.find(node => {
44        const label = (node.label || '').toLowerCase()
45        return label.includes('main gate') || label.includes('main entry')
46      })
47    
48      return gateNode?.id || null
49    }
```

---

### 📄 c:\Users\Omkar\Desktop\AIISEP\3d optimisation\xyz-master\xyz-master\src\data\urlNavigation.test.js
*Saved at: 7/1/2026, 9:13:19 PM*

**[ADDED]**
```
1     import test from 'node:test'
2     import assert from 'node:assert/strict'
3     import { resolveDestinationFromPath } from './urlNavigation.js'
4     
5     test('resolves /H204 to the H building entry node', () => {
6       const navGraph = {
7         nodes: [
8           { id: 'main_gate', label: 'Main Gate', type: 'GATE' },
9           { id: 'h_wing_entry', label: 'H Wing Main Entry', type: 'BUILDING_ENTRY', buildingId: 'building_H' },
10        ],
11        edges: [],
12      }
13    
14      const buildings = [{ id: 'building_H', name: 'H Wing', entryNodeId: 'h_wing_entry' }]
15    
16      assert.deepEqual(resolveDestinationFromPath('/H204', { buildings, navGraph }), {
17        buildingId: 'building_H',
18        destinationNodeId: 'h_wing_entry',
19        sourceNodeId: 'main_gate',
20      })
21    })
22    
23    test('resolves /A203 to the A building entry node', () => {
24      const navGraph = {
25        nodes: [
26          { id: 'main_gate', label: 'Main Gate', type: 'GATE' },
27          { id: 'a_wing_entry', label: 'A Wing Entry', type: 'BUILDING_ENTRY', buildingId: 'building_A' },
28        ],
29        edges: [],
30      }
31    
32      const buildings = [{ id: 'building_A', name: 'A Wing', entryNodeId: 'a_wing_entry' }]
33    
34      assert.deepEqual(resolveDestinationFromPath('/A203', { buildings, navGraph }), {
35        buildingId: 'building_A',
36        destinationNodeId: 'a_wing_entry',
37        sourceNodeId: 'main_gate',
38      })
39    })
```

---

