import { NavMeshQuery } from "recast-navigation"
import { generateSoloNavMesh } from "recast-navigation/generators"
import * as RecastThree from "recast-navigation/three"
import { BoxGeometry, Mesh } from "three"

console.log(RecastThree)

const groundMesh = new Mesh(new BoxGeometry(5, 0.2, 5))

/**
 * @type {import('recast-navigation/generators').SoloNavMeshGeneratorConfig}
 */
const config = {
  borderSize: 0,
  cs: 0.2,
  ch: 0.2,
  walkableSlopeAngle: 35,
  walkableHeight: 1,
  walkableClimb: 1,
  walkableRadius: 1,
  maxEdgeLen: 12,
  maxSimplificationError: 1.3,
  minRegionArea: 8,
  mergeRegionArea: 20,
  maxVertsPerPoly: 6,
  detailSampleDist: 6,
  detailSampleMaxError: 1,
}

const positions = groundMesh.geometry.attributes.position.array
const indices = groundMesh.geometry.index?.array || []

export const generateNavMesh = () => {    
  const { success, navMesh } = generateSoloNavMesh(positions, indices, config)

  if (!success) return null
  
  const navMeshQuery = new NavMeshQuery({ navMesh })

  const closestPoint = navMeshQuery.getClosestPoint({ x: 2, y: 1, z: 2 })

  console.log(closestPoint.x, closestPoint.y, closestPoint.z)

  return navMesh
}
