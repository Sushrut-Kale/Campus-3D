import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveDestinationFromPath } from './urlNavigation.js'

test('resolves /H204 to the H building entry node', () => {
  const navGraph = {
    nodes: [
      { id: 'main_gate', label: 'Main Gate', type: 'GATE' },
      { id: 'h_wing_entry', label: 'H Wing Main Entry', type: 'BUILDING_ENTRY', buildingId: 'building_H' },
    ],
    edges: [],
  }

  const buildings = [{ id: 'building_H', name: 'H Wing', entryNodeId: 'h_wing_entry' }]

  assert.deepEqual(resolveDestinationFromPath('/H204', { buildings, navGraph }), {
    buildingId: 'building_H',
    destinationNodeId: 'h_wing_entry',
    sourceNodeId: 'main_gate',
  })
})

test('resolves /A203 to the A building entry node', () => {
  const navGraph = {
    nodes: [
      { id: 'main_gate', label: 'Main Gate', type: 'GATE' },
      { id: 'a_wing_entry', label: 'A Wing Entry', type: 'BUILDING_ENTRY', buildingId: 'building_A' },
    ],
    edges: [],
  }

  const buildings = [{ id: 'building_A', name: 'A Wing', entryNodeId: 'a_wing_entry' }]

  assert.deepEqual(resolveDestinationFromPath('/A203', { buildings, navGraph }), {
    buildingId: 'building_A',
    destinationNodeId: 'a_wing_entry',
    sourceNodeId: 'main_gate',
  })
})
