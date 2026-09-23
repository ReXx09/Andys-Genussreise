# Deployment

## GHCR-Build

1. Änderungen nach `main` oder `master` pushen.
2. In GitHub Actions prüfen, dass `npm ci`, `npm test` und der Docker-Build erfolgreich sind.
3. Erst danach auf Unraid aktualisieren.

## Unraid / Dockge

```bash
docker pull ghcr.io/rexx09/andys-genussreise:latest
docker compose up -d --force-recreate
```

Der Container nutzt den internen Port `3000`. Der externe Port wird über `HOST_PORT` festgelegt. Der Healthcheck prüft `/api/health`.

## Datenbank-Backup

Vor einem Update ein Backup des gemounteten Datenverzeichnisses erstellen. Für das Standardverzeichnis:

```bash
mkdir -p /mnt/user/backup/andys-kochbuch
docker stop kochbuch-dashboard
cp /mnt/user/appdata/andys-kochbuch/database.sqlite /mnt/user/backup/andys-kochbuch/database-$(date +%Y-%m-%d-%H%M%S).sqlite
docker start kochbuch-dashboard
```

Bei einem anderen `DATA_DIR` den Quellpfad entsprechend anpassen. Backups sollten außerhalb des Appdata-Verzeichnisses liegen und regelmäßig aufbewahrt werden.
