# Fix hero padding-top: 100px introduced by old nav (now body handles it)
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Get-ChildItem $dir -Filter "*.html" | ForEach-Object {
    $c = Get-Content $_.FullName -Raw -Encoding UTF8
    $new = $c -replace 'padding-top:\s*100px', 'padding-top: 0'
    if ($c -ne $new) {
        Set-Content $_.FullName $new -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($_.Name)"
    }
}
Write-Host "Done."
