type LicenseUnusally = 'Apache-2.0' | 'BSD-3-Clause' | 'BSD-2-Clause' | 'GPL' | 'LGPL' | 'MIT' | 'MPL-1.1' | 'CDDL-1.0' | 'EPL-1.0'
declare type DependencyType = string | { name: string, [key: PropertyKey]: unknown }
type Status = 'fail' | 'pass'
type VersionType = {
    gitTree: string,
    version?: string,
    versionDate?: string,
    portVersion: number
}[]
declare type PackageDetailType = {
    name: string,
    version: string,
    $comment:string,
    versionDate:string,
    maintainers:string[],
    features:{[key:PropertyKey]:{description:string,[key:PropertyKey]:unknown}},
    portVersion: number,
    description: string,
    documentation:string,
    homepage: string,
    license: LicenseUnusally | string,
    supports: string,
    dependencies: DependencyType[],
    status: { [key: string]: Status },
    versions: VersionType
}