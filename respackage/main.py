import click

try:
    from . import query
except ImportError:
    import respackage.query as query


@click.group()
def cli()->None:
    pass
    
cli.add_command(query.query)
cli.add_command(query.upsert)
 